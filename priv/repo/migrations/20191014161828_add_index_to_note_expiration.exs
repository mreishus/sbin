defmodule Sbin.Repo.Migrations.AddIndexToNoteExpiration do
  use Ecto.Migration

  def change do
    create index("notes", [:expire])
  end
end
