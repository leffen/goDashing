var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Dashing.DoughnutChart = (function(superClass) {
  extend(DoughnutChart, superClass);

  function DoughnutChart() {
    return DoughnutChart.__super__.constructor.apply(this, arguments);
  }

  DoughnutChart.prototype.ready = function() {
    var $holder, bottom, canvas, container, height, left, right, top, width;
    left = this.get('leftMargin') || 0;
    right = this.get('rightMargin') || left;
    top = this.get('topMargin') || 0;
    bottom = this.get('bottomMargin') || top;
    container = $(this.node).parent();
    width = (Dashing.widget_base_dimensions[0] * container.data("sizex")) + Dashing.widget_margins[0] * 2 * (container.data("sizex") - 1) - left - right;
    height = (Dashing.widget_base_dimensions[1] * container.data("sizey")) - 35 - top - bottom;
    if (!!this.get('moreinfo')) {
      height -= 20;
    }
    $holder = $("<div class='canvas-holder' style='left:" + left + "px; top:" + top + "px; position:absolute;'></div>");
    $(this.node).append($holder);
    canvas = $(this.node).find('.canvas-holder');
    canvas.append("<canvas width=\"" + width + "\" height=\"" + height + "\" class=\"chart-area\"/>");
    this.ctx = $(this.node).find('.chart-area')[0].getContext('2d');
    this.myData = this.get('segments');
    return this.myChart = new Chart(this.ctx).Doughnut(this.myData, $.extend({
      responsive: true,
      segmentShowStroke: true
    }, this.get('options')));
  };

  DoughnutChart.prototype.onData = function(data) {
    var i, j, ref;
    if (this.myChart && data.segments) {
      for (i = j = 0, ref = this.myChart.segments.length - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
        this.myChart.segments[i].value = data.segments[i].value;
      }
      return this.myChart.update();
    }
  };

  return DoughnutChart;

})(Dashing.Widget);

// ---
// generated by coffee-script 1.9.2