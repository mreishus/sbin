defmodule Sbin.Repo.Migrations.AddSaltToNotes do
  use Ecto.Migration

  def change do
    alter table("notes") do
      add(:salt, :string)
    end
  end
end
