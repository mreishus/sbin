defmodule Sbin.NotesTest do
  use Sbin.DataCase

  alias Sbin.Notes

  describe "notes" do
    alias Sbin.Notes.Note

    @valid_attrs %{
      content: "some content",
      expire: "2010-04-17T14:00:00Z",
      title: "some title",
      syntax: "some syntax",
      salt: "some salt",
      shortcode: "some shortcode"
    }
    @update_attrs %{
      content: "some updated content",
      expire: "2011-05-18T15:01:01Z",
      title: "some updated title",
      syntax: "some updated syntax",
      salt: "some updated salt",
      shortcode: "some updated shortcode"
    }
    @invalid_attrs %{content: nil, expire: nil, title: nil}

    def note_fixture(attrs \\ %{}) do
      {:ok, note} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Notes.create_note()

      note
    end

    test "list_notes/0 returns all notes" do
      note = note_fixture()
      assert Notes.list_notes() == [note]
    end

    test "get_note!/1 returns the note with given id" do
      note = note_fixture()
      assert Notes.get_note!(note.id) == note
    end

    test "create_note/1 with valid data creates a note" do
      assert {:ok, %Note{} = note} = Notes.create_note(@valid_attrs)
      assert note.content == "some content"
      assert note.expire == DateTime.from_naive!(~N[2010-04-17T14:00:00Z], "Etc/UTC")
      assert note.title == "some title"
      assert note.syntax == "some syntax"
      assert note.salt == "some salt"
      assert note.shortcode == "some shortcode"
    end

    test "create_note/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Notes.create_note(@invalid_attrs)
    end

    test "update_note/2 with valid data updates the note" do
      note = note_fixture()
      assert {:ok, %Note{} = note} = Notes.update_note(note, @update_attrs)
      assert note.content == "some updated content"
      assert note.expire == DateTime.from_naive!(~N[2011-05-18T15:01:01Z], "Etc/UTC")
      assert note.title == "some updated title"
      assert note.syntax == "some updated syntax"
      assert note.salt == "some updated salt"
      assert note.shortcode == "some updated shortcode"
    end

    test "update_note/2 with invalid data returns error changeset" do
      note = note_fixture()
      assert {:error, %Ecto.Changeset{}} = Notes.update_note(note, @invalid_attrs)
      assert note == Notes.get_note!(note.id)
    end

    test "delete_note/1 deletes the note" do
      note = note_fixture()
      assert {:ok, %Note{}} = Notes.delete_note(note)
      assert_raise Ecto.NoResultsError, fn -> Notes.get_note!(note.id) end
    end

    test "change_note/1 returns a note changeset" do
      note = note_fixture()
      assert %Ecto.Changeset{} = Notes.change_note(note)
    end
  end
end
