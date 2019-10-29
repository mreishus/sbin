defmodule SbinWeb.NoteController do
  use SbinWeb, :controller

  alias Sbin.Notes
  alias Sbin.Notes.Note
  alias Sbin.Metrics

  action_fallback(SbinWeb.FallbackController)

  def index(conn, _params) do
    notes = Notes.list_notes()
    render(conn, "index.json", notes: notes)
  end

  def create(conn, %{"note" => note_params_orig}) do
    note_params =
      note_params_orig
      |> add_shortcode()
      |> transform_expire()

    with {:ok, %Note{} = note} <- Notes.create_note(note_params) do
      Metrics.note_created(note_params_orig, conn)

      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.note_path(conn, :show, note))
      |> render("show.json", note: note)
    end
  end

  defp add_shortcode(note_params) do
    shortcode = :crypto.strong_rand_bytes(6) |> Base.url_encode64()

    note_params
    |> Map.put("shortcode", shortcode)
  end

  defp transform_expire(note_params) do
    seconds_to_add = expire_string_to_seconds(note_params["expire"])

    expire = DateTime.utc_now() |> DateTime.add(seconds_to_add, :second)

    note_params
    |> Map.put("expire", expire)
  end

  @spec expire_string_to_seconds(String.t()) :: integer
  defp expire_string_to_seconds(expire_str) do
    day_seconds = 86_400

    expires = %{
      "15 minutes" => 900,
      "1 hour" => 3600,
      "1 day" => day_seconds,
      "1 week" => day_seconds * 7,
      "1 month" => day_seconds * 31,
      "3 months" => day_seconds * 31 * 3,
      "1 year" => day_seconds * 365,
      "3 years" => day_seconds * 365 * 3
    }

    Map.get(expires, expire_str, day_seconds * 31)
  end

  def show(conn, %{"id" => shortcode}) do
    note = Notes.get_active_note_by_shortcode!(shortcode)
    Metrics.note_shown(note, conn)
    render(conn, "show.json", note: note)
  end

  def update(conn, %{"id" => id, "note" => note_params}) do
    note = Notes.get_note!(id)

    with {:ok, %Note{} = note} <- Notes.update_note(note, note_params) do
      render(conn, "show.json", note: note)
    end
  end

  def delete(conn, %{"id" => id}) do
    note = Notes.get_note!(id)

    with {:ok, %Note{}} <- Notes.delete_note(note) do
      send_resp(conn, :no_content, "")
    end
  end
end
