defmodule SbinWeb.NoteController do
  use SbinWeb, :controller

  alias Sbin.Notes
  alias Sbin.Notes.Note

  action_fallback SbinWeb.FallbackController

  def index(conn, _params) do
    notes = Notes.list_notes()
    render(conn, "index.json", notes: notes)
  end

  def create(conn, %{"note" => note_params}) do
    note_params =
      note_params
      |> add_shortcode()
      |> transform_expire()

    with {:ok, %Note{} = note} <- Notes.create_note(note_params) do
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
    seconds_to_add =
      case note_params["expire"] do
        "1 hour" ->
          3600

        "1 day" ->
          86_400

        "1 week" ->
          86_400 * 7

        "1 month" ->
          86_400 * 31

        "1 year" ->
          86_400 * 365

        _ ->
          86_400 * 31
      end

    expire = DateTime.utc_now() |> DateTime.add(seconds_to_add, :second)

    note_params
    |> Map.put("expire", expire)
  end

  def show(conn, %{"id" => shortcode}) do
    note = Notes.get_active_note_by_shortcode!(shortcode)
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
