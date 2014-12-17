var express = require('express');
var serveStatic = require('serve-static');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(serveStatic('resources', {'index': ['index.html'] }));

var metrics = { watts: 340, amperes: 1, heurescreuses: 10000000, heurespleines: 50000000 };

io.on('connection', function (socket) {
  function publishMetrics() {
    socket.emit('metrics', metrics);
    metrics.heurespleines++;
  }
  var timer = setInterval(publishMetrics, 1000);

  socket.on('my other event', function (data) {
    console.log(data);
  });

  socket.on('disconnect', function(socket) {
    console.log("disconnect",arguments);
    clearInterval(timer);
  })
});

server.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Listening at http://%s:%s', host, port)
})