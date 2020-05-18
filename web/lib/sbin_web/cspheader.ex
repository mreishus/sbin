defmodule SbinWeb.CSPHeader do
  @moduledoc """
  Add a content-security-policy header to help prevent XSS attacks.
  """
  import Plug.Conn

  def init(opts), do: opts

  def call(conn, _opts) do
    put_resp_header(conn, "content-security-policy", csp(conn))
  end

  defp csp(conn) do
    "default-src 'self'; \
    connect-src 'self' #{ws_url(conn)} #{ws_url(conn, "wss")}  https://jsonplaceholder.typicode.com/ ; \
    script-src 'self' 'unsafe-inline' 'unsafe-eval'; \
    style-src 'self' 'unsafe-inline' 'unsafe-eval'"
  end

  defp ws_url(conn, protocol \\ "ws") do
    endpoint = Phoenix.Controller.endpoint_module(conn)
    %{endpoint.struct_url | scheme: protocol} |> URI.to_string()
  end
end
