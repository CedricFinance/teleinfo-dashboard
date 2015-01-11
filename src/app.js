var express = require('express');
var serveStatic = require('serve-static');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var Stomp = require('stomp-client');
var config = require('./config');
var activemq_connect = require('./activemq_connect');

activemq_connect(config.activemq).then(function(client) {
  io.on('connection', function (socket) {
    client.subscribe(config.activemq.destination, function(body, headers) {
      var metrics = JSON.parse(body);
      socket.emit('metrics', metrics);
    });

    socket.on('my other event', function (data) {
      console.log(data);
    });

    socket.on('disconnect', function(socket) {
      console.log("disconnect",arguments);
      //client.unsubscribe(destination); // only for the last one
    })
  });
});

app.use(serveStatic('resources', {'index': ['index.html'] }));

var metrics = { watts: 340, amperes: 1, heurescreuses: 10000000, heurespleines: 50000000 };

server.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Listening at http://%s:%s', host, port)
})