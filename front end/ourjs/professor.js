/**
 * ---------------------------------------
 * This demo was created using amCharts 5.
 * 
 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v5/
 * ---------------------------------------
 */

// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root1 = am5.Root.new("chartdiv2");


// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root1.setThemes([
  am5themes_Animated.new(root1)
]);


// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart1 = root1.container.children.push(am5xy.XYChart.new(root1, {
  panX: false,
  panY: false,
  wheelX: "panX",
  wheelY: "zoomX",
  layout: root1.verticalLayout
}));


// Data
var colors = chart1.get("colors");

var data = [{
  id: 1,
  name: "Mirzo Ulug'bek",
  y: 3,
  x: 9,
  yomon: 364,
  yaxshi: 377,
  ikkalasiyam: 237 
},{
  id: 2,
  name: "Yunusobod",
  y: 1,
  x: 8,
  yomon: 595,
  yaxshi: 352,
  ikkalasiyam: 346
},{
  id: 3,
  name: "Yashnobod",
  y: 5,
  x: 8,
  yomon: 299,
  yaxshi: 191,
  ikkalasiyam: 162
},{
  id: 4,
  name: "Bektemir",
  y: 7,
  x: 9,
  yomon: 141,
  yaxshi: 122,
  ikkalasiyam: 99
},{
  id: 5,
  name: "Mirobod",
  y: 3,
  x: 7,
  yomon: 275,
  yaxshi: 152,
  ikkalasiyam: 166
},{
  id: 6,
  name: "Olmozor",
  y: 1,
  x: 6,
  yomon: 426,
  yaxshi: 282,
  ikkalasiyam: 221
},{
  id: 7,
  name: "Shoyxontohur",
  y: 3,
  x: 5,
  yomon: 342,
  yaxshi: 186,
  ikkalasiyam: 218
},{
  id: 8,
  name: "Yakkasaroy",
  y: 5,
  x: 6,
  yomon: 201,
  yaxshi: 139,
  ikkalasiyam: 144
},{
  id: 9,
  name: "Uchtepa",
  y: 3,
  x: 3,
  yomon: 280,
  yaxshi: 149,
  ikkalasiyam: 189
},{
  id: 10,
  name: "Chilonzor",
  y: 5,
  x: 4,
  yomon: 578,
  yaxshi: 289,
  ikkalasiyam: 357
},{
  id: 11,
  name: "Sergeli",
  y: 7,
  x: 5,
  yomon: 376,
  yaxshi: 283,
  ikkalasiyam: 223
},{
  id: 12,
  name: "Yangihayot",
  y: 7,
  x: 3,
  "yomon": 65,
  "yaxshi": 30,
  "ikkalasiyam": 64
}];
for (var i = data.length - 1; i >= 0; i--) {
  data[i].icon = "images/uzb.svg";
  data[i].columnSettings = { fill: colors.next() };
  }


// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis1 = chart1.xAxes.push(am5xy.CategoryAxis.new(root1, {
  categoryField: "name",
  renderer: am5xy.AxisRendererX.new(root1, {
    minGridDistance: 30
  }),
  bullet: function (root1, axis, dataItem) {
    return am5xy.AxisBullet.new(root1, {
      location: 0.5,
      sprite: am5.Picture.new(root1, {
        width: 24,
        height: 24,
        centerY: am5.p50,
        centerX: am5.p50,
        src: dataItem.dataContext.icon
      })
    });
  }
}));

xAxis1.get("renderer").labels.template.setAll({
  paddingTop: 20
});

xAxis1.data.setAll(data);

var yAxis1 = chart1.yAxes.push(am5xy.ValueAxis.new(root1, {
  renderer: am5xy.AxisRendererY.new(root1, {})
}));


// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series1 = chart1.series.push(am5xy.ColumnSeries.new(root1, {
  xAxis: xAxis1,
  yAxis: yAxis1,
  valueYField: "yaxshi",
  categoryXField: "name"
}));

series1.columns.template.setAll({
  tooltipText: "{categoryX}: {valueY}",
  tooltipY: 0,
  strokeOpacity: 0,
  templateField: "columnSettings"
});

series1.data.setAll(data);


// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series1.appear();
chart1.appear(1000, 100);