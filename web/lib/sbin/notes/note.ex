defmodule Sbin.Notes.Note do
  @moduledoc """
  Represents a "Note".  This is an entry in the pastebin.
  """
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "notes" do
    field :content, :string
    field :expire, :utc_datetime
    field :title, :string
    field :syntax, :string
    field :salt, :string
    field :shortcode, :string

    timestamps()
  end

  @doc false
  def changeset(note, attrs) do
    note
    |> cast(attrs, [:title, :content, :expire, :syntax, :salt, :shortcode])
    |> validate_required([:content, :expire, :salt, :shortcode])
  end
end
