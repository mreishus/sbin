defmodule Sbin.Repo.Migrations.AddIndexToNoteShortcode do
  use Ecto.Migration

  def change do
    create(unique_index("notes", [:shortcode]))
  end
end
