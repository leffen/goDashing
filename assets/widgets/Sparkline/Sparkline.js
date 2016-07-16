var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Dashing.Sparkline = (function(superClass) {
  extend(Sparkline, superClass);

  function Sparkline() {
    return Sparkline.__super__.constructor.apply(this, arguments);
  }

  Sparkline.accessor('current', function() {
    var points;
    if (this.get('points')) {
      points = this.get('points');
      return points[points.length - 1].y;
    } else {
      return "";
    }
  });

  Sparkline.accessor('difference', function() {
    var current, diff, last, points;
    if (this.get('points')) {
      points = this.get('points');
      current = parseInt(points[points.length - 1].y);
      last = parseInt(points[points.length - 2].y);
      if (last !== 0) {
        diff = Math.abs(Math.round((current - last) / last * 100));
        return diff + "%";
      } else {
        return "100%";
      }
    } else {
      return "";
    }
  });

  Sparkline.accessor('arrow', function() {
    var current, last, points;
    if (this.get('points')) {
      points = this.get('points');
      current = parseInt(points[points.length - 1].y);
      last = parseInt(points[points.length - 2].y);
      if (current >= last) {
        return 'icon-arrow-up';
      } else {
        return 'icon-arrow-down';
      }
    }
  });

  Sparkline.prototype.ready = function() {
    var $graph, container, height, width;
    container = $(this.node).parent();
    width = (Dashing.widget_base_dimensions[0] * container.data('sizex')) + Dashing.widget_margins[0] * 2 * (container.data('sizex') - 1);
    height = Dashing.widget_base_dimensions[1] * container.data('sizey');
    height /= 5;
    $graph = $("<div class='sparkline-container' style='height:" + height + "px;'></div>");
    $(this.node).append($graph);
    this.graph = new Rickshaw.Graph({
      element: $graph.get(0),
      width: width,
      height: height,
      renderer: this.get('graphtype'),
      series: [
        {
          color: '#fff',
          data: [
            {
              x: 0,
              y: 0
            }
          ]
        }
      ]
    });
    if (this.get('points')) {
      this.graph.series[0].data = this.get('points');
      return this.graph.render();
    }
  };

  Sparkline.prototype.onData = function(data) {
    if (this.graph && data.points) {
      this.graph.series[0].data = data.points;
      return this.graph.render();
    }
  };

  return Sparkline;

})(Dashing.Widget);

// ---
// generated by coffee-script 1.9.2