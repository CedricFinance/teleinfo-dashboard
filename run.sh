#!/bin/sh

docker run -it --rm -p 3000:3000 --link activemq2:mq teleinfo-dashboard $*
