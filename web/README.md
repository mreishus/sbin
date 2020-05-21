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
npm install
cd ../
mix phx.server
```

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

There's an optional classifier service. The webserver expects to be able to
reach it on `http://localhost:8000/predict`. To get it running, you'll need
to have `./classify/03-web/server.py` running. However, this takes a fair
amount of effort, since you will need to have a working fastai2 environment in
python, and a trained model (`export.pkl`).

The trained model and the training data is not currently uploaded to github
since they're too large (200mb for the model, 100mb+ training data, will prob
get more.).

If the classifier isn't running, you should be able to still use the app
without user facing errors. However, it's a nice to have to be able to turn
off the classifier.

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
- `CLASSIFIER_URL` - Example: `http://sbin-classifier:8000/predict`

The classifier URL is a webservice providing the language classification.
It's available on the docker image `mreishus/sbin-classifier`, which listens
on port 8000. Warning, it's quite large (6 gigs).

If not specified, it defaults to `http://localhost:8000/predict`. If it's not
running, not that much will happen; just some wasted effort and a few 404s
whenever the content box changes and the user pauses. The user probably won't
notice anything. However, it's a nice to have to be able to turn off the
classifier service.

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
