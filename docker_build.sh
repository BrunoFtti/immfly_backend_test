#!/bin/bash

if [ -z $TAG ]
then
    echo "Missing the TAG for the image. e.g.: TAG=1.0.0 $0"
    exit 1
fi


# Build the image
sudo docker build . -t immfly_backend_test:$TAG
