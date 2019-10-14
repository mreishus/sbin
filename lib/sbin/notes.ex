defmodule Sbin.Notes do
  @moduledoc """
  The Notes context.
  """

  import Ecto.Query, warn: false
  alias Sbin.Repo

  alias Sbin.Notes.Note

  @doc """
  Returns the list of notes.

  ## Examples

      iex> list_notes()
      [%Note{}, ...]

  """
  def list_notes do
    Repo.all(Note)
  end

  @doc """
  Gets a single note.

  Raises `Ecto.NoResultsError` if the Note does not exist.

  ## Examples

      iex> get_note!(123)
      %Note{}

      iex> get_note!(456)
      ** (Ecto.NoResultsError)

  """
  def get_note!(id), do: Repo.get!(Note, id)

  def get_note_by_shortcode!(shortcode), do: Repo.get_by!(Note, shortcode: shortcode)

  @doc """
  Creates a note.

  ## Examples

      iex> create_note(%{field: value})
      {:ok, %Note{}}

      iex> create_note(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_note(attrs \\ %{}) do
    %Note{}
    |> Note.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a note.

  ## Examples

      iex> update_note(note, %{field: new_value})
      {:ok, %Note{}}

      iex> update_note(note, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_note(%Note{} = note, attrs) do
    note
    |> Note.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Note.

  ## Examples

      iex> delete_note(note)
      {:ok, %Note{}}

      iex> delete_note(note)
      {:error, %Ecto.Changeset{}}

  """
  def delete_note(%Note{} = note) do
    Repo.delete(note)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking note changes.

  ## Examples

      iex> change_note(note)
      %Ecto.Changeset{source: %Note{}}

  """
  def change_note(%Note{} = note) do
    Note.changeset(note, %{})
  end

  @doc """
  Delete all notes that have an expire date in the past.
  """
  def delete_outdated_notes() do
    Note
    |> outdated_query()
    |> Repo.delete_all()
  end

  @doc """
  Get a list of all notes that have an expire date in the past.
  """
  def list_outdated_notes() do
    Note
    |> outdated_query()
    |> Repo.all()
  end

  @doc """
  Get a count of all notes that have expired.
  Returns a single int.
  """
  def count_outdated_notes() do
    Note
    |> outdated_query()
    |> select([n], count(n))
    |> Repo.one()
  end

  @doc """
  Query for getting outdated notes.
  """
  def outdated_query(query) do
    now = DateTime.utc_now()
    from(n in query, where: n.expire < ^now)
  end
end
