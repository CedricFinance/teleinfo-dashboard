$(function () {
  $.getJSON("/api/v1/indexes", function(data) {
    $('#main_graph').highcharts({
      chart: { borderColor: '#e7e7e7', borderWidth: 1, type: 'line', backgroundColor: "#f8f8f8" },
      title: { text: 'Consommation', x: -20 },
      xAxis: { type: 'datetime', minRange: 10 * 1000 },
      yAxis: [
        { title: { text: 'Consommation Heures Creuses (kWh)' }, plotLines: [{ value: 0, width: 1, color: '#808080' }] },
        { title: { text: 'Consommation Heures Pleines (kWh)' }, plotLines: [{ value: 0, width: 1, color: '#808080' }], opposite: true },
      ],
      tooltip: { valueSuffix: 'kWh' },
      legend: { layout: 'horizontal', align: 'center', verticalAlign: 'bottom', borderWidth: 0 },
      data: {
        rows : data
      },
      series: [
        { yAxis: 0 },
        { yAxis: 1 }
      ]
    });
  });
});