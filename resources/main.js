var app = angular.module('electricity-dashboard', {});

app.controller("LiveMetricsCtrl", LiveMetricsCtrl);

function LiveMetricsCtrl($scope) {
  this.live = { price_period: "HP.." };
  var ctrl = this;

  var socket = io.connect('http://localhost:3000');
  socket.on('metrics', function (data) {
    $scope.$apply(function() {
      ctrl.live = data;
    })

    push(previousHP, data.peak_hours_index);
    push(previousHC, data.offpeak_hours_index);
    push(previousAmps, data.amperes);
    push(previousWatts, data.watts);

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
  $(elementSelector).sparkline(values, { width: values.length * 2, tooltipSuffix: unit });
}

var maxLength = 40;
var previousHP = [];
var previousHC = [];
var previousAmps = [];
var previousWatts = [];

function updateGraphs() {
  displayValues(previousHP, '#hp_graph', "Wh");
  displayValues(previousHC, '#hc_graph', "Wh");
  displayValues(previousAmps, '#amps_graph', "A");
  displayValues(previousWatts, '#watts_graph', "W");
}

function push(array, value) {
  array.push(value);
  if (array.length > maxLength) {
    array.splice(0, 1);
  }
}
