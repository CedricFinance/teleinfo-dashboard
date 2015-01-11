#!/bin/sh

docker run -it --rm -p 3000:3000 --link teleinfo-activemq:mq --link mongo:mongo -e ACTIVEMQ_USER=subscriber -e ACTIVEMQ_PASSWORD=subscriber --name teleinfo-dashboard -v $PWD:/home/app node-runtime-dev
