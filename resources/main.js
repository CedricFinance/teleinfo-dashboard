var app = angular.module('electricity-dashboard', {});

app.controller("LiveMetricsCtrl", LiveMetricsCtrl);

var maxLength = 40;

function LiveMetricsCtrl($scope) {
  this.live = { price_period: "HP.." };
  var ctrl = this;

  var previousHP = new FixedQueue(maxLength);
  var previousHC = new FixedQueue(maxLength);
  var previousAmps = new FixedQueue(maxLength);
  var previousWatts = new FixedQueue(maxLength);

  function updateGraphs() {
    displayValues(previousHP, '#hp_graph', "Wh");
    displayValues(previousHC, '#hc_graph', "Wh");
    displayValues(previousAmps, '#amps_graph', "A");
    displayValues(previousWatts, '#watts_graph', "W");
  }

  var socket = io.connect('http://localhost:3000');
  socket.on('metrics', function (data) {
    $scope.$apply(function() {
      ctrl.live = data;
    })

    previousHP.push(data.peak_hours_index);
    previousHC.push(data.offpeak_hours_index);
    previousAmps.push(data.amperes);
    previousWatts.push(data.watts);

    updateGraphs();

    //socket.emit('my other event', { my: 'data' });
  });
}

LiveMetricsCtrl.prototype.getPricingPeriodIcon = function() {
  return { '': 'question-mark', 'HC..': 'moon', 'HP..': 'sun' }[this.live.pricing_period];
}

LiveMetricsCtrl.prototype.getPricingPeriodLabel = function() {
  return { '': '', 'HC..': 'Heures Creuses', 'HP..': 'Heures Pleines' }[this.live.pricing_period];
}

function displayValues(values, elementSelector, unit) {
  $(elementSelector).sparkline(values, { width: values.length * 2, tooltipSuffix: unit, height: 18 });
}
