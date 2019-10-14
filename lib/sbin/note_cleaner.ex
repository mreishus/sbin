defmodule Sbin.NoteCleaner do
  @moduledoc """
  Simple module to delete expired notes.
  Should be run as a scheduled job.

  All you need to do is call NoteCleaner.run/0.
  """

  alias Sbin.Notes
  require Logger

  def run do
    Logger.info("NoteCleaner: Starting.")
    count = Notes.count_outdated_notes()
    Logger.info("NoteCleaner: Deleting #{count} outdated notes.")
    Notes.delete_outdated_notes()
    Logger.info("NoteCleaner: Deleted #{count} outdated successfully.")
  end
end
