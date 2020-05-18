defmodule SbinWeb.PageController do
  use SbinWeb, :controller

  def index(conn, _params) do
    # render(conn, "index.html")
    conn
    |> redirect(to: Routes.fe_path(conn, :index, []))
  end
end
