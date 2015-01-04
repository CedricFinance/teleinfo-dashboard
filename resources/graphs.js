$(function () {
  $('#main_graph').highcharts({
    chart: { borderColor: '#e7e7e7', borderWidth: 1, type: 'line', backgroundColor: "#f8f8f8" },
    title: { text: 'Consommation', x: -20 },
    xAxis: { type: 'datetime', minRange: 10 * 1000 },
    yAxis: {
      min: 0,
      title: { text: 'Consommation (kWh)' },
      plotLines: [{ value: 0, width: 1, color: '#808080' }]
    },
    tooltip: { valueSuffix: 'kWh' },
    legend: { layout: 'vertical', align: 'right', verticalAlign: 'middle', borderWidth: 0 },
    data: {
      rows : [
        [ "dates", "Heures Creuses", "Heures Pleines"],
        ["Sun Jan 04 2015 20:15:33 GMT+0100 (CET)",  10, 4],
        [ "Sun Jan 04 2015 20:15:34 GMT+0100 (CET)", 10, 9],
        [ "Sun Jan 04 2015 20:15:35 GMT+0100 (CET)", 10, 13],
        [ "Sun Jan 04 2015 20:15:36 GMT+0100 (CET)", 10, 17],
        [ "Sun Jan 04 2015 20:15:37 GMT+0100 (CET)", 12, 17],
        [ "Sun Jan 04 2015 20:15:38 GMT+0100 (CET)", 14, 17],
        [ "Sun Jan 04 2015 20:15:39 GMT+0100 (CET)", 16, 17],
        [ "Sun Jan 04 2015 20:15:40 GMT+0100 (CET)", 20, 17],
        [ "Sun Jan 04 2015 20:15:41 GMT+0100 (CET)", 24, 17],
      ]
    }
  });
});