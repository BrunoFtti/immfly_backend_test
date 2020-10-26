#!/bin/bash

if [[ $# -eq 1 || $1 == "--help" ]]; then
  echo -e "\n-- Possible variables: \n \
TAG=(docker image tag to run - Required)\n \
NODE_ENV=(development, test, production) \n \
CONTAINER_PORT=(container will run on this port) \n \
e.g.:\nTAG=1.0.0 CONTAINER_PORT=8070 NODE_ENV=development ./docker_run.sh"
  exit 1
else
  echo -e "-- Run '$0 --help' to know all the possible variables\n"
fi


if [ -z $TAG ]
then
    echo "Missing TAG variable. e.g.: TAG=1.0.0 $0"
    exit 1
fi

if [ -z $NODE_ENV ]
then
    echo "Missing NODE_ENV variable (development, test, production). e.g.: NODE_ENV=development $0"
    echo "Using development as default"
    NODE_ENV=development
fi


if [ -z $CONTAINER_PORT ]
then
    echo "Missing CONTAINER_PORT variable. e.g.: CONTAINER_PORT=1.0.0 $0"
    echo "Using 8080 as default"
    CONTAINER_PORT=8080
fi

# Kill a previous instance in this port
sudo docker rm -f immfly_backend_test_${CONTAINER_PORT} > /dev/null 2>&1

# Run the new instance
sudo docker run -d -p ${CONTAINER_PORT}:8080 -e NODE_ENV=${NODE_ENV} -e CONTAINER_PORT=${CONTAINER_PORT} \
    --name immfly_backend_test_${CONTAINER_PORT} immfly_backend_test:$TAG
