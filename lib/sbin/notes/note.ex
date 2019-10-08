defmodule Sbin.Notes.Note do
  @moduledoc """
  Represents a "Note".
  Not much here yet, still just exploring.
  """
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "notes" do
    field :content, :string
    field :expire, :utc_datetime
    field :title, :string

    timestamps()
  end

  @doc false
  def changeset(note, attrs) do
    note
    |> cast(attrs, [:title, :content, :expire])
    |> validate_required([:title, :content, :expire])
  end
end
