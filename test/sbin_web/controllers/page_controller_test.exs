defmodule SbinWeb.PageControllerTest do
  use SbinWeb.ConnCase

  test "GET /", %{conn: conn} do
    conn = get(conn, "/")
    assert html_response(conn, 200) =~ "Sign"
  end
end
