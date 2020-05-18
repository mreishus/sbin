defmodule Sbin.NoteCleaner do
  @moduledoc """
  Simple module to delete expired notes.
  Should be run as a scheduled job.

  All you need to do is call NoteCleaner.run/0.
  """

  alias Sbin.Notes
  alias Sbin.Metrics
  require Logger

  def run do
    Logger.info("NoteCleaner: Starting.")
    count = Notes.count_expired_notes()

    if count > 0 do
      Logger.info("NoteCleaner: Deleting #{count} expired notes.")
      Notes.delete_expired_notes()
      Metrics.note_cleanup(count)
      Logger.info("NoteCleaner: Deleted #{count} expired notes successfully.")
    end
  end
end
