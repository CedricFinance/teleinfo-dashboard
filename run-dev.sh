#!/bin/sh

docker run -it --rm -p 3000:3000 --link teleinfo-activemq:mq -e ACTIVEMQ_USER=subscriber -e ACTIVEMQ_PASSWORD=subscriber -v $PWD:/home/app node-runtime-dev
