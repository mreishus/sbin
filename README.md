# Sbin

**Sbin is an open source encrypted paste-bin, where the server has zero
knowledge of pasted data.**

sbin is inspired by [privatebin](https://privatebin.info/) and its predecessor
[zerobin](https://sebsauvage.net/wiki/doku.php?id=php:zerobin), but uses its
own code. it uses postgres, elixir, phoenix, typescript and react.

when making a new paste, the javascript client chooses a random
password to encrypt the data with before sending it to the server. the
server stores the encrypted data only; it does not know the password
to decrypt it. the password is inside the URL shown to the user. since
the password is inside the fragment of the url after the hash, it is
never sent to the server.

when reading a paste, the server sends the encrypted data to the
browser, which will use the password embedded in the URL to attempt to
decrypt the contents. if the password is wrong, the browser will only
display gibberish.

## Running the project (Development)

```
mix deps.get
mix ecto.setup
cd assets
yarn install
cd ../
mix phx.server
```

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

## Running the project (Production)

Create a Docker Image:

```
edit build.sh with your favorite text editor - change docker tag to your namespace
./build.sh
```

Run the docker image via your favorite method. Expose port 4000 to anywhere
you want, typically 80. This requires a PostGres database to connect to to
save the notes.

You will need to set these environment variables for the docker image running:

- `SECRET_KEY_BASE` - Generate one with `mix phx.gen.secret`.
- `DATABASE_URL` - Example: `ecto://dbuser:dbpass@hostname/dbname`

## Online Version

**Newest version is deployed at [https://sbin.top/](https://sbin.top/).**

## Linting / Tests / Etc

Run `mix check` to run all tests and linting.

## Optional Honeycomb Configuration

To report metrics to honeycomb.io, set these environment variables when running:

- HONEYCOMB_APIKEY
- HONEYCOMB_DATASET

Example:

```bash
export HONEYCOMB_APIKEY="012345678912345678abcde123456789"
export HONEYCOMB_DATASET="sbin-elixir"
```
