var express = require('express');
var serveStatic = require('serve-static');
var app = express();

app.use(serveStatic('resources', {'index': ['index.html'] }));

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Listening at http://%s:%s', host, port)
})