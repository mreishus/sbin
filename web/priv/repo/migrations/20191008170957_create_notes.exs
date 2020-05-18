defmodule Sbin.Repo.Migrations.CreateNotes do
  use Ecto.Migration

  def change do
    create table(:notes, primary_key: false) do
      add(:id, :binary_id, primary_key: true)
      add(:title, :string)
      add(:content, :text)
      add(:expire, :utc_datetime)

      timestamps()
    end
  end
end
