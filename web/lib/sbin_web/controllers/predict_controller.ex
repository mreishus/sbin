defmodule SbinWeb.PredictController do
  use SbinWeb, :controller
  alias Sbin.Metrics
  require Logger

  # alias Sbin.Metrics

  action_fallback(SbinWeb.FallbackController)

  def predict(conn, %{"text" => text}) do
    case do_predict(text) do
      {:error, reason} ->
        conn
        |> put_status(500)
        |> json(%{error: %{status: 500, message: reason}})

      {:ok, prediction} ->
        conn |> json(prediction)
    end
  end

  defp do_predict(text) do
    url = Application.get_env(:sbin, :classifier)[:url]
    Logger.info("Prediction url is [#{url}]")

    body = {:form, [text: text]}
    options = [{"Content-Type", "application/json"}]

    case HTTPoison.post(url, body, options) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        Metrics.predict_success()
        {:ok, parse_prediction(body)}

      {:ok, %HTTPoison.Response{status_code: 404}} ->
        Metrics.predict_failure()
        Logger.error("Prediction service down. #{url} not found.")
        {:error, "Prediction service down."}

      {:error, %HTTPoison.Error{reason: reason}} ->
        Metrics.predict_failure()
        Logger.error("Prediction error. #{inspect(reason)}")
        {:error, reason}
    end
  end

  defp parse_prediction(text), do: Jason.decode!(text)
end
