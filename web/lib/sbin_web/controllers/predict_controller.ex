# TODOS
# 1. Need to send metrics to count successful predictions and errors
# 2. Need to make url customizable.

defmodule SbinWeb.PredictController do
  use SbinWeb, :controller

  # alias Sbin.Metrics

  action_fallback(SbinWeb.FallbackController)

  def predict(conn, %{"text" => text}) do
    "Requested to predict" |> IO.inspect(label: "1")
    text |> IO.inspect(label: "text")

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
    url = "http://localhost:8000/predict"
    body = {:form, [text: text]}
    options = [{"Content-Type", "application/json"}]

    case HTTPoison.post(url, body, options) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        # Metric: Successful prediction
        {:ok, parse_prediction(body)}

      {:ok, %HTTPoison.Response{status_code: 404}} ->
        # Metric: 404 on prediction
        IO.puts("Url [" <> url <> "] Not found :(")
        {:error, "Prediction service down."}

      {:error, %HTTPoison.Error{reason: reason}} ->
        # Metric: error on prediction
        reason |> IO.inspect(label: "prediction error")
        {:error, reason}
    end
  end

  defp parse_prediction(text), do: Jason.decode!(text)
end
