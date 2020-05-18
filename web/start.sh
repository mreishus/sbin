#!/bin/bash
# This is used by the docker container to run migrations,
# then start the server.

./bin/sbin eval "Sbin.Release.migrate"
./bin/sbin start
