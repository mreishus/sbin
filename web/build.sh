#!/bin/bash

VERSION=1.1.2 # Bump in AboutIndex.tsx too
# Also check ../classify/03-web/build.sh
# ^ Todo: Make this one source of truth

# exit when any command fails
set -e

mix check

echo "Building..."
docker build --tag=mreishus/sbin:$VERSION --tag=mreishus/sbin:latest .
docker push mreishus/sbin:latest
docker push mreishus/sbin:$VERSION
cd ..

echo "Done!"
