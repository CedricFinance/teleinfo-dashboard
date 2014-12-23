FROM node:latest

ENV ACTIVEMQ_USER subscriber
ENV ACTIVEMQ_PASSWORD subscriber

RUN useradd -m app

USER app
WORKDIR /home/app

ADD package.json /home/app/
RUN npm install

ADD resources /home/app/resources
ADD src /home/app/src

EXPOSE 3000

CMD DEBUG=* node src/app.js
