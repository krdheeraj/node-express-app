(function () {

  'use strict';

  nodeApp.directive('nodeChart', function ($window, $rootScope) {
    var ctrlFn = function () {
      return function () {
        var dirCtrl = this;
        dirCtrl.chartData = [];
        dirCtrl.chartSets = ['Set A', 'Set B', 'Set C', 'Set D'];
        dirCtrl.chartSet = '0';
        dirCtrl.chartTypes = ['Bar', 'Line', 'Pie', 'Area'];
        dirCtrl.chartType = '0';

        dirCtrl.makeData = function () {
          var data = [], alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
          var random = function () {
            return Math.floor(Math.random() * 100) + 1;
          };
          for (var i = 0; i < alphabets.length; i++) {
            data.push({label: alphabets[i], value: random()});
          }
          return data;
        };

        dirCtrl.changeSet = function () {
          dirCtrl.chartData = dirCtrl.makeData();
          $rootScope.$emit('changeChart');
        };

        dirCtrl.changeChart = function () {
          $rootScope.$emit('changeChart');
        };

        dirCtrl.changeSet();
      }
    };

    var linkFn = function (d3) {
      return function (scope, element, attrs) {
        if (!attrs) return;
        var wrapper = '#chart', dirCtrl = scope.dirCtrl;

        d3.detach = function (arg) {
          d3.select(wrapper + ' ' + arg).remove();
          return d3;
        };

        var drawBarChart = function (data, margin, width, height) {
          var color = d3.scale.category20b();

          var x = d3.scale.ordinal()
            .rangeRoundBands([0, width]);
          var y = d3.scale.linear()
            .range([height, 0]);

          var xAxis = d3.svg.axis()
            .scale(x)
            .orient('bottom');
          var yAxis = d3.svg.axis()
            .scale(y)
            .orient('left');

          var chart = d3.detach('svg')
            .select(wrapper)
            .append('svg')
            .attr('class', 'chart')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

          x.domain(data.map(function (d) {
            return d.label;
          }));
          y.domain([0, d3.max(data, function (d) {
            return d.value;
          })]);

          chart.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis)
            .append('text')
            .attr('y', margin.top)
            .attr('x', width)
            .attr('dx', '.70em')
            .style('text-anchor', 'end')
            .text('Alphabets');

          chart.append('g')
            .attr('class', 'y axis')
            .call(yAxis)
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', -(margin.left * 2 / 3))
            .attr('dy', '.70em')
            .style('text-anchor', 'end')
            .text('Frequency');

          var bar = chart.append('g')
            .selectAll('.rect')
            .data(data)
            .enter()
            .append('g')
            .attr('class', function (d) {
              return 'rect-wrapper rect-wrapper-' + d.label;
            })
            .append('rect')
            .attr('class', function (d) {
              return 'rect rect-' + d.label;
            })
            .attr('y', function (d) {
              return y(d.value);
            })
            .attr('x', function (d) {
              return x(d.label);
            })
            .attr('height', function (d) {
              return height - y(d.value);
            })
            .attr('fill', function (d, i) {
              return color(i);
            })
            .attr('width', x.rangeBand());
        };

        var drawLineChart = function (data, margin, width, height) {
          var x = d3.scale.ordinal()
            .rangeRoundBands([0, width]);
          var y = d3.scale.linear()
            .range([height, 0]);

          var xAxis = d3.svg.axis()
            .scale(x)
            .orient('bottom');
          var yAxis = d3.svg.axis()
            .scale(y)
            .orient('left');

          var chart = d3.detach('svg')
            .select(wrapper)
            .append('svg')
            .attr('class', 'chart')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

          x.domain(data.map(function (d) {
            return d.label;
          }));
          y.domain([0, d3.max(data, function (d) {
            return d.value;
          })]);

          chart.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis)
            .append('text')
            .attr('y', margin.top)
            .attr('x', width)
            .attr('dx', '.70em')
            .style('text-anchor', 'end')
            .text('Alphabets');

          chart.append('g')
            .attr('class', 'y axis')
            .call(yAxis)
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', -(margin.left * 2 / 3))
            .attr('dy', '.70em')
            .style('text-anchor', 'end')
            .text('Frequency');

          var line = d3.svg.line()
            .x(function (d) {
              return x(d.label);
            })
            .y(function (d) {
              return y(d.value);
            });

          chart.append('g')
            .attr('class', 'line-wrapper')
            .attr('transform', function () {
              return 'translate(' + 2 * x(data[0].label) + ',0)';
            })
            .append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line);
        };

        var drawPieChart = function (data, margin, width, height) {
          var radius = height / 2;
          var color = d3.scale.category20b();

          var x = d3.scale.ordinal()
            .rangeRoundBands([0, width]);
          var y = d3.scale.linear()
            .range([height, 0]);

          var xAxis = d3.svg.axis()
            .scale(x)
            .orient('bottom');
          var yAxis = d3.svg.axis()
            .scale(y)
            .orient('left');

          var chart = d3.detach('svg')
            .select(wrapper)
            .append('svg')
            .attr('class', 'chart')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

          x.domain(data.map(function (d) {
            return d.label;
          }));
          y.domain([0, d3.max(data, function (d) {
            return d.value;
          })]);

          chart.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis)
            .append('text')
            .attr('y', margin.top)
            .attr('x', width)
            .attr('dx', '.70em')
            .style('text-anchor', 'end')
            .text('Alphabets');

          chart.append('g')
            .attr('class', 'y axis')
            .call(yAxis)
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', -(margin.left * 2 / 3))
            .attr('dy', '.70em')
            .style('text-anchor', 'end')
            .text('Frequency');

          var arc = d3.svg.arc()
            .innerRadius(0)
            .outerRadius(radius);

          var pie = d3.layout.pie()
            .value(function (d) {
              return d.value;
            })
            .sort(null);

          var path = chart.append('g')
            .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2 - 15) + ')')
            .selectAll('path')
            .data(pie(data))
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', function (d, i) {
              return color(i);
            });
        };

        var drawAreaChart = function (data, margin, width, height) {
          var x = d3.scale.ordinal()
            .rangeRoundBands([0, width]);
          var y = d3.scale.linear()
            .range([height, 0]);

          var xAxis = d3.svg.axis()
            .scale(x)
            .orient('bottom');
          var yAxis = d3.svg.axis()
            .scale(y)
            .orient('left');

          var chart = d3.detach('svg')
            .select(wrapper)
            .append('svg')
            .attr('class', 'chart')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

          x.domain(data.map(function (d) {
            return d.label;
          }));
          y.domain([0, d3.max(data, function (d) {
            return d.value;
          })]);

          chart.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis)
            .append('text')
            .attr('y', margin.top)
            .attr('x', width)
            .attr('dx', '.70em')
            .style('text-anchor', 'end')
            .text('Alphabets');

          chart.append('g')
            .attr('class', 'y axis')
            .call(yAxis)
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', -(margin.left * 2 / 3))
            .attr('dy', '.70em')
            .style('text-anchor', 'end')
            .text('Frequency');

          var area = d3.svg.area()
            .x(function (d) {
              return x(d.label);
            })
            .y0(height)
            .y1(function (d) {
              return y(d.value);
            });

          chart.append("path")
            .attr('class', 'line-wrapper')
            .attr('transform', function () {
              return 'translate(' + 2 * x(data[0].label) + ',0)';
            })
            .datum(data)
            .attr("class", "area")
            .attr("d", area);
        };

        var drawChart = function () {
          var data = dirCtrl.chartData;
          var margin = {top: 25, right: 50, bottom: 30, left: 55};
          var width = angular.element('#chart')[0].offsetWidth - margin.left - margin.right;
          var height = 400 - margin.top - margin.bottom;

          switch (dirCtrl.chartTypes[dirCtrl.chartType]) {
            case 'Bar':
              drawBarChart.apply(this, [data, margin, width, height]);
              break;
            case 'Line':
              drawLineChart.apply(this, [data, margin, width, height]);
              break;
            case 'Pie':
              drawPieChart.apply(this, [data, margin, width, height]);
              break;
            case 'Area':
              console.log('Area');
              drawAreaChart.apply(this, [data, margin, width, height]);
              break;
          }
        };

        $rootScope.$on('changeChart', function () {
          drawChart.call(this);
        });
        drawChart.call(this);
      }
    };

    return {
      restrict: 'E',
      scope: true,
      templateUrl: '/templates/chart.template.html',
      controller: ctrlFn(),
      controllerAs: 'dirCtrl',
      link: linkFn($window.d3)
    };

  });

})();
