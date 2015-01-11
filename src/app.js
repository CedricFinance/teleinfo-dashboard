var express = require('express');
var serveStatic = require('serve-static');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var Q = require('q');
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

var MongoClient = require('mongodb').MongoClient;
var connect = Q.denodeify(MongoClient.connect);
connect(config.mongo.url).then(function(db) {
  console.log("Connected to mongodb");

  var collection = db.collection('raw_metrics');

  app.get("/api/v1/indexes", function(req, res) {
    collection.find({}).sort({ date: -1 }).limit(100).toArray(function(err, docs) {
      var results = [ [ "dates", "Heures Creuses" , "Heures Pleines" ] ];
      docs.forEach(function(raw_metric) {
        results.push([ raw_metric.date, raw_metric.offpeak_hours_index , raw_metric.peak_hours_index ]);
      });
      res.json(results);
    });

  });

}).done();

server.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Listening at http://%s:%s', host, port)
})