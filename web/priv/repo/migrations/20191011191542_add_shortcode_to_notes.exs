defmodule Sbin.Repo.Migrations.AddShortcodeToNotes do
  use Ecto.Migration

  def change do
    alter table("notes") do
      add(:shortcode, :string)
      unique_index("notes", [:shortcode])
    end
  end
end
