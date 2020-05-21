# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :sbin, env: Mix.env()

config :sbin,
  ecto_repos: [Sbin.Repo]

# Configures the endpoint
config :sbin, SbinWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "ftp2bzqyMJbpNr6yfeDxvULxgEf9JD7kuFgJdo+hZsizDEFp8Epj0mGxsJ61M0vu",
  render_errors: [view: SbinWeb.ErrorView, accepts: ~w(html json)],
  pubsub_server: Sbin.PubSub

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Pow authentication
config :sbin, :pow,
  user: Sbin.Users.User,
  repo: Sbin.Repo,
  web_module: SbinWeb

config :sbin, :classifier, url: "http://localhost:8000/predict"

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
