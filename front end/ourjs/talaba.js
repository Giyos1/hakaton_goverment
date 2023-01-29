var root = am5.Root.new("chartdiv1");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(am5xy.XYChart.new(root, {}));
// hide grid
chart.gridContainer.set("opacity", 0)


// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 50, inside: true }),
  min: 0,
  max: 12,
  strictMinMax: true,
  opacity: 0
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, { inside: true, inversed: true }),
  min: -1,
  max: 7,
  strictMinMax: true,
  opacity: 0
}));

// Create series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.LineSeries.new(root, {
  calculateAggregates: true,
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "y",
  valueXField: "x",
  valueField: "value"
}));


// Add bullet
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Bullets
var template = am5.Template.new({});
series.bullets.push(function() {
  var graphics = am5.Line.new(root, {
    fill: series.get("fill"),
    tooltipText: "{name}\n\nYaxshi:{yaxshi}\nYomon:{yomon}\nIkkalasi:{ikkalasiyam}",
    tooltipY: -am5.p50,
    stroke: am5.color(0xffffff),
    strokeWidth: 2
  }, template);



  // we use adapter for x as radius will be called only once and x will be called each time position changes
  graphics.adapters.add("x", function(x, target) {
    var w = Math.abs(xAxis.getX(0, 1, 0) - xAxis.getX(2, 1, 0)) / 2;
    var h = Math.abs(yAxis.getY(0, 1, 0) - yAxis.getY(2, 1, 0)) / 2;

    var p0 = { x: 0, y: -h };
    var p1 = { x: w, y: -h / 2 };
    var p2 = { x: w, y: h / 2 };
    var p3 = { x: 0, y: h };
    var p4 = { x: -w, y: h / 2 };
    var p5 = { x: -w, y: -h / 2 };
    var p6 = { x: 0, y: -h };

    target.set("segments", [[[p0, p1, p2, p3, p4, p5, p6]]])

    // return original x
    return x;
  })

  return am5.Bullet.new(root, {
    sprite: graphics
  });
});

// another bullet for label
series.bullets.push(function() {
  var label = am5.Label.new(root, {
    populateText: true,
    centerX: am5.p50,
    centerY: am5.p50,
    text: "{name}\n   Index:{value}"
  });

  return am5.Bullet.new(root, {
    sprite: label
  });
});

series.set("heatRules", [{
  target: template,
  min: am5.color(0xfe131a),
  max: am5.color(0x00ff00),
  dataField: "value",
  key: "fill"
}]);


series.strokes.template.set("strokeOpacity", 0);


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
  data[i].value = data[i].yaxshi - data[i].yomon;
  }

// loop through all items and add 0,5 to all items in odd rows
var vStep = (1 + am5.math.sin(30)) / 2;
am5.array.each(data, function(di) {
  var dx = 0;
  if (di.y / 2 == Math.round(di.y / 2)) {
    di.x += 0.5;
  }
  // shift y for the hext to stick to each other
  di.y = vStep * di.y;
})

series.data.setAll(data);

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear(1000);

chart.appear(1000, 100);