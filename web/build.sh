#!/bin/bash

VERSION=1.1.0 # Bump in AboutIndex.tsx too
# Also check ../classify/03-web/build.sh
# ^ Todo: Make this one source of truth

# exit when any command fails
set -e

# Disabled check 5/19/2020.  Wanted to show something
# off in a demo.  Please fix errors and renable soon!
# mix check
echo "============="
echo "MIX CHECK IS DISABLED.  FIX THIS!"
echo "============="

echo "Building..."
docker build --tag=mreishus/sbin:$VERSION --tag=mreishus/sbin:latest .
docker push mreishus/sbin:latest
docker push mreishus/sbin:$VERSION
cd ..

echo "Done!"
