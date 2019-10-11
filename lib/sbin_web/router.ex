defmodule SbinWeb.Router do
  use SbinWeb, :router
  use Pow.Phoenix.Router

  pipeline :browser do
    plug(:accepts, ["html"])
    plug(:fetch_session)
    plug(:fetch_flash)
    plug(:protect_from_forgery)
    plug(:put_secure_browser_headers)
    plug(SbinWeb.CSPHeader)
  end

  pipeline :api do
    plug(:accepts, ["json"])
  end

  pipeline :protected do
    plug Pow.Plug.RequireAuthenticated,
      error_handler: Pow.Phoenix.PlugErrorHandler
  end

  scope "/" do
    pipe_through :browser

    pow_routes()
  end

  scope "/", SbinWeb do
    pipe_through :browser

    get "/", PageController, :index
    get "/f/*path", FeController, :index
  end

  scope "/", SBinWeb do
    pipe_through [:browser, :protected]

    # Add your protected routes here
  end

  # Other scopes may use custom stacks.
  scope "/api", SbinWeb do
    pipe_through :api
    resources "/notes", NoteController, except: [:new, :edit]
  end
end
