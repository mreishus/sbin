# Sbin

To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.setup`
  * Install Node.js dependencies with `cd assets && npm install`
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](https://hexdocs.pm/phoenix/deployment.html).

## Optional Honeycomb Configuration

To report metrics to honeycomb.io, set these environment variables when running:

* HONEYCOMB_APIKEY
* HONEYCOMB_DATASET

Example:

```bash
export HONEYCOMB_APIKEY="012345678912345678abcde123456789"
export HONEYCOMB_DATASET="sbin-elixir"
```

