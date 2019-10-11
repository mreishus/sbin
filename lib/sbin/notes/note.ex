defmodule Sbin.Notes.Note do
  @moduledoc """
  Represents a "Note".
  Not much here yet, still just exploring.

  Possible idea for shorter urls:

  Encode:

  iex(19)> id1 = a.id
  "84b473f9-3dc1-4155-aa0c-2316c4fa2b90"
  iex(20)> id2 = a.id |> String.replace("-", "")
  "84b473f93dc14155aa0c2316c4fa2b90"
  iex(21)> {:ok, id3} = id2 |> String.upcase() |> Base.decode16()
  {:ok,
  <<132, 180, 115, 249, 61, 193, 65, 85, 170, 12, 35, 22, 196, 250, 43, 144>>}
  iex(22)> id4 = id3 |> Base.encode64()
  "hLRz+T3BQVWqDCMWxPorkA=="

  Decode

  iex(22)> id4 = id3 |> Base.encode64()
  "hLRz+T3BQVWqDCMWxPorkA=="
  iex(23)> {:ok, id5} = id4 |> Base.decode64()
  {:ok,
  <<132, 180, 115, 249, 61, 193, 65, 85, 170, 12, 35, 22, 196, 250, 43, 144>>}
  iex(24)> id6 = id5 |> Base.encode16()
  "84B473F93DC14155AA0C2316C4FA2B90"

  # Need something to lowercase and add dashes

  Is it a gain?

  http://mysite.dev/note/84b473f9-3dc1-4155-aa0c-2316c4fa2b90
  http://mysite.dev/note/hLRz+T3BQVWqDCMWxPorkA==

  I think so?



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
