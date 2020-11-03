#! /bin/bash

# stop container
docker stop image-tag-container

# default set the port to 8000
port=8000
v=''

while getopts "p:v:" opt; do
    case ${opt} in
        p) 
            port="$OPTARG"
            echo "$OPTARG"
            ;;
        v) 
            v="$OPTARG"
            echo "$OPTARG"
            ;;
    esac
done
shift "$(($OPTIND -1))"

# start container
docker run --rm -d -p ${port}:8000 -v "${v}":/media/image-tag/images --name=image-tag-container image-tag