var express = require('express');
var serveStatic = require('serve-static');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var Stomp = require('stomp-client');

var destination = '/topic/electricity/metrics';
var user = process.env.ACTIVEMQ_USER;
var pass = process.env.ACTIVEMQ_PASSWORD;
var port = 61613;
var url = 'mongodb://mongo/electricity';

var client = new Stomp('mq', port, user, pass);

client.connect(function(sessionId) { console.log("connected"); });

app.use(serveStatic('resources', {'index': ['index.html'] }));

var metrics = { watts: 340, amperes: 1, heurescreuses: 10000000, heurespleines: 50000000 };

io.on('connection', function (socket) {
  client.subscribe(destination, function(body, headers) {
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

server.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Listening at http://%s:%s', host, port)
})