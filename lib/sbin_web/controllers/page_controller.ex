defmodule SbinWeb.PageController do
  use SbinWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
