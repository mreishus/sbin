#!/bin/bash

VERSION=0.3.5 # Bump in AboutIndex.tsx too
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
