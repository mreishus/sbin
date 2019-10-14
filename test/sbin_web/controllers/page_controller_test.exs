defmodule SbinWeb.PageControllerTest do
  use SbinWeb.ConnCase

  test "GET /", %{conn: conn} do
    conn = get(conn, "/")
    # assert html_response(conn, 200) =~ "Sign"
    assert html_response(conn, 302) =~ "/f"
  end
end
