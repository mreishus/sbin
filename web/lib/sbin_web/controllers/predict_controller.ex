defmodule SbinWeb.PredictController do
  use SbinWeb, :controller

  # alias Sbin.Notes
  # alias Sbin.Notes.Note
  # alias Sbin.Metrics

  action_fallback(SbinWeb.FallbackController)

  def predict(conn, %{"text" => text}) do
    "Requested to predict" |> IO.inspect(label: "1")
    text |> IO.inspect(label: "text")

    conn
    |> json(%{id: 123})
  end
end
