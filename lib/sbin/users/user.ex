defmodule Sbin.Users.User do
  @moduledoc """
  User Accounts.  All handled by POW for now.
  """
  use Ecto.Schema
  use Pow.Ecto.Schema

  schema "users" do
    pow_user_fields()

    timestamps()
  end
end
