defmodule Sbin.Repo do
  use Ecto.Repo,
    otp_app: :sbin,
    adapter: Ecto.Adapters.Postgres
end
