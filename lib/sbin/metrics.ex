defmodule Sbin.Metrics do
  @moduledoc """

  """
  alias Sbin.Notes.Note

  def note_created(note_params, conn) do
    Task.async(fn ->
      %{
        event: :note_created,
        when: DateTime.utc_now(),
        env: env(),
        expire: note_params["expire"],
        syntax: note_params["syntax"],
        ip: get_ip(conn)
      }
      |> send_to_honeycomb()
    end)
  end

  def note_shown(%Note{} = note, conn) do
    Task.async(fn ->
      %{
        event: :note_shown,
        when: DateTime.utc_now(),
        env: env(),
        syntax: note.syntax,
        ip: get_ip(conn)
      }
      |> send_to_honeycomb()
    end)
  end

  def note_cleanup(how_many) do
    Task.async(fn ->
      %{
        event: :note_cleanup,
        when: DateTime.utc_now(),
        env: env(),
        how_many: how_many
      }
      |> send_to_honeycomb()
    end)
  end

  def send_to_honeycomb(params) do
    with {:ok, api_key} <- System.fetch_env("HONEYCOMB_APIKEY"),
         {:ok, dataset} <- System.fetch_env("HONEYCOMB_DATASET") do
      send_to_honeycomb_(params, api_key, dataset)
    end
  end

  defp send_to_honeycomb_(params, api_key, dataset) do
    body = Poison.encode!(params)
    url = "https://api.honeycomb.io/1/events/" <> dataset

    headers = [
      {"Content-type", "application/json"},
      {"X-Honeycomb-Team", api_key}
    ]

    Task.async(fn ->
      HTTPoison.post(url, body, headers, [])
    end)
  end

  defp env do
    Application.get_env(:sbin, :env)
  end

  defp get_ip(conn) do
    conn.remote_ip |> :inet_parse.ntoa() |> to_string()
  end
end
