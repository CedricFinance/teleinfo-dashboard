$(function () {
  $('#main_graph').highcharts({
    chart: { borderColor: '#e7e7e7', borderWidth: 1, type: 'line', backgroundColor: "#f8f8f8" },
    title: { text: 'Consommation', x: -20 },
    xAxis: { type: 'datetime' },
    yAxis: {
      min: 0,
      title: { text: 'Consommation (kWh)' },
      plotLines: [{ value: 0, width: 1, color: '#808080' }]
    },
    tooltip: { valueSuffix: 'kWh' },
    legend: { layout: 'vertical', align: 'right', verticalAlign: 'middle', borderWidth: 0 },
    series: [
      { name: 'Heures Creuses', data: [ [Date.UTC(1970,  9, 27), 7.0], [Date.UTC(1970,  9, 28), 6.9], [Date.UTC(1970,  9, 29), 9.9] ] },
      { name: 'Heures Pleines', data: [ [Date.UTC(1970,  9, 27), 5.0], [Date.UTC(1970,  9, 28), 3.9], [Date.UTC(1970,  9, 29), 6.9] ] }
    ]
  });
});