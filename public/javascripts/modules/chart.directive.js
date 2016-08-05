(function () {

  'use strict';

  nodeApp.directive('nodeChart', function ($window, $rootScope) {
    var ctrlFn = function () {
      return function () {
        var dirCtrl = this;
        dirCtrl.chartData = [];
        dirCtrl.chartSets = ['Lorem Ipsum Set A', 'Lorem Ipsum Set B', 'Lorem Ipsum Set C', 'Lorem Ipsum Set D'];
        dirCtrl.chartSet = '0';

        dirCtrl.makeData = function () {
          var data = [], alphabets = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
          var random = function() {
            return Math.floor(Math.random() * 100) + 1;
          };
          for(var i = 0; i < alphabets.length; i++) {
            data.push({label: alphabets[i], value: random()});
          }
          return data;
        };

        dirCtrl.changeSet = function () {
          dirCtrl.chartData = dirCtrl.makeData();
          $rootScope.$emit('changeChart');
        };
        dirCtrl.changeSet();
      }
    };

    var linkFn = function (d3) {
      return function (scope, element, attrs) {
        if (!attrs) return;
        var wrapper = '#chart', dirCtrl = scope.dirCtrl;
        d3.detach = function(arg) {
          d3.select(wrapper + ' ' + arg).remove();
          return d3;
        };

        var drawChart = function () {
          var data = dirCtrl.chartData,
            color = d3.scale.category20b(),
            margin = { top: 25, right: 50, bottom: 30, left: 55},
            width = angular.element('#chart')[0].offsetWidth - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

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
            .select('#chart')
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
            .attr('fill', function(d, i) {
              return color(i);
            })
            .attr('width', x.rangeBand() - 1);
        };

        $rootScope.$on('changeChart', function() {
          drawChart();
        });
        drawChart();
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
