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
updateGraphs();

function push(array, value) {
  array.push(value);
  if (array.length > maxLength) {
    array.splice(0, 1);
  }
}

var socket = io.connect('http://localhost:3000');
socket.on('metrics', function (data) {
  push(previousHP, data.heurespleines);
  push(previousHC, data.heurescreuses);
  push(previousAmps, data.amperes);
  push(previousWatts, data.watts);

  updateGraphs();

  document.getElementById("heurespleines").innerText = data.heurespleines;
  document.getElementById("heurescreuses").innerText = data.heurescreuses;
  document.getElementById("watts").innerText = data.watts;
  document.getElementById("amperes").innerText = data.amperes;
  socket.emit('my other event', { my: 'data' });
});
