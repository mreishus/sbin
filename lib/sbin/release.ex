defmodule Sbin.Release do
  @moduledoc """
  Helper for running Migrations after deployed by release.
  See https://hexdocs.pm/phoenix/releases.html for more info.

  ./start.sh allows us to run `./bin/sbin eval "Sbin.Release.migrate"` when
  starting the app up.
  """
  @app :sbin

  def migrate do
    for repo <- repos() do
      {:ok, _, _} = Ecto.Migrator.with_repo(repo, &Ecto.Migrator.run(&1, :up, all: true))
    end
  end

  def rollback(repo, version) do
    {:ok, _, _} = Ecto.Migrator.with_repo(repo, &Ecto.Migrator.run(&1, :down, to: version))
  end

  defp repos do
    Application.load(@app)
    Application.fetch_env!(@app, :ecto_repos)
  end
end
