#!/usr/bin/bash
docker build -t mreishus/sbin-classifier:v1.1.2 .
docker build -t mreishus/sbin-classifier:latest .
echo To upload:
echo docker push mreishus/sbin-classifier:v1.1.2
