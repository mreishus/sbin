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

## `./web`

This is the main webapp directory.

## `./classify`

This is an experiment in early stages at writing a programming language
detector. No promises here; it may be abandoned. Not currently used by the
Webapp.
