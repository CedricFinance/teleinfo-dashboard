#!/bin/sh

docker run -it --rm -p 3000:3000 --link teleinfo-activemq:mq teleinfo-dashboard $*
