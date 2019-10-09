defmodule SbinWeb.FeController do
  use SbinWeb, :controller

  def index(conn, _params) do
    conn
    |> put_layout({SbinWeb.LayoutView, "app_spa.html"})
    |> render("index.html")
  end
end
