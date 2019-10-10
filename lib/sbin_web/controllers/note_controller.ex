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
    today_plus_one_month = DateTime.utc_now() |> DateTime.add(86_400 * 30, :second)
    note_params = note_params |> Map.put("expire", today_plus_one_month)

    with {:ok, %Note{} = note} <- Notes.create_note(note_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.note_path(conn, :show, note))
      |> render("show.json", note: note)
    end
  end

  def show(conn, %{"id" => id}) do
    note = Notes.get_note!(id)
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
