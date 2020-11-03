#! /bin/bash

# this script boots up docker container for image-tag

# stop existing running container
docker stop image-tag-container

# remove existing image
docker image rmi image-tag

# build docker image
docker build -t image-tag .