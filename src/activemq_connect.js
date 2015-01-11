var Q = require('q');
var Stomp = require('stomp-client');

module.exports = function(mq_config) {
  var client = new Stomp(mq_config.alias, mq_config.port, mq_config.user, mq_config.pass);

  var deferred = Q.defer();
  client.connect(function(sessionId) {
    deferred.resolve(client);
  }).on('error', function(err) {
    deferred.reject(new Error(err));
  });
  return deferred.promise;
}
