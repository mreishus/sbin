defmodule Sbin.Repo.Migrations.NotesAddSyntaxColumn do
  use Ecto.Migration

  def change do
    alter table("notes") do
      add(:syntax, :string)
    end
  end
end
