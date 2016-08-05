(function () {

  'use strict';

  nodeApp.directive('nodeTable', function($window, $rootScope) {
    var linkFn = function(d3) {
      return function(scope, element, attrs) {
        var htmlTable = {}, tableCtrl = scope.tableCtrl;

        var toLowerCase = function(str) {
          return (typeof str === 'string') ? str.toLowerCase() : str;
        };

        var random = function (min, max) {
          return Math.floor((Math.random() * (max - min + 1)) + min);
        };

        var tabulate = function(headers, data) {
          jQuery(element[0]).find('table').remove();
          var table = d3.select(element[0])
            .append('table')
            .attr('class', 'table table-responsive table-bordered table-hover table-striped');
          var thead = table.append('thead'), tbody = table.append('tbody');
          thead.append('tr')
            .selectAll('th')
            .data(headers)
            .enter()
            .append('th')
            .attr('data-sort-direction', 'dsc')
            .attr('class', 'table-header')
            .text(function(col) {
              return col;
            })
            .on('click', function(col) {
              var that = d3.select(this), all = d3.selectAll('th[data-sort-direction="asc"]');
              jQuery(this).find('>.sort').trigger('focus');
              if(that.attr('data-sort-direction') === 'asc') {
                all.attr('data-sort-direction', 'dsc');
                htmlTable.selectAll('tbody tr').sort(function(a, b) {
                  return (toLowerCase(a[col]) > toLowerCase(b[col])) ? -1 : (toLowerCase(a[col]) < toLowerCase(b[col])) ? 1 : 0;
                });
                all.selectAll('i').attr('class', 'glyphicon glyphicon-chevron-up');
                that.attr('data-sort-direction', 'dsc');
                that.select('i').attr('class', 'glyphicon glyphicon-chevron-up');
              }
              else {
                all.attr('data-sort-direction', 'dsc');
                htmlTable.selectAll('tbody tr').sort(function(a, b) {
                  return (toLowerCase(a[col]) > toLowerCase(b[col])) ? 1 : (toLowerCase(a[col]) < toLowerCase(b[col])) ? -1 : 0;
                });
                all.selectAll('i').attr('class', 'glyphicon glyphicon-chevron-up');
                that.attr('data-sort-direction', 'asc');
                that.select('i').attr('class', 'glyphicon glyphicon-chevron-down');
              }
            })
            .append('span')
            .attr('class', 'sort pull-right')
            .attr('ng-focus', 'dirCtrl.sortFn($event)')
            .append('i')
            .attr('class', 'glyphicon glyphicon-chevron-up');
          tbody.selectAll('tr')
            .data(data)
            .enter()
            .append('tr')
            .selectAll('td')
            .data(function(row) {
              return headers.map(function(col) {
                return { column: col, value: row[col] };
              });
            })
            .enter()
            .append('td')
            .attr('class', function(cell) {
              return cell.column;
            })
            .text(function(cell) {
              return cell.value;
            });
          return table;
        };

        var makeData = function (pageSize, pageNumber) {
          var rowCount = pageSize * pageNumber,
            obj = { headers: ['id', 'name', 'gender', 'age', 'status', 'country', 'profession', 'experience'], data: []},
            country = ['India', 'USA', 'Canada', 'UAE', 'Australia', 'UK', 'Switzerland'],
            status = ['Married', 'Single', 'Divorcee'],
            experience = ['Novice', 'Ninja' ,'Intermediate'],
            gender = ['Male', 'Female', 'Gay', 'Lesbian'];
          for (var index = rowCount - pageSize | 1; index <= rowCount; index++) {
            obj.data.push({
              id: index,
              name: 'Lorem Ipsum-' + index,
              gender: gender[random(0, gender.length - 1)],
              age: random(23, 32),
              country: country[random(0, country.length - 1)],
              status: status[random(0, status.length - 1)],
              experience: experience[random(0, experience.length - 1)],
              profession: 'Software Engineer'
            });
          }
          return obj;
        };

        var callPopulate = function () {
          var pageSize = parseInt(tableCtrl.pageSize, 10), pageNumber = parseInt(tableCtrl.pageNumber, 10), data = makeData(pageSize, pageNumber);
          data.data.sort(function (a, b) {
            return d3.ascending(a.id, b.id);
          });
          htmlTable = tabulate(data.headers, data.data);
          var selector = d3.select('th[data-sort-direction]:first-child');
          selector.attr('data-sort-direction', 'asc');
          selector.select('i').attr('class', 'glyphicon glyphicon-chevron-down');
        };

        $rootScope.$on('changeValue', function () {
          callPopulate();
        });
        callPopulate();
      };
    };

    return {
      link: linkFn($window.d3),
      restrict: 'E',
      scope: false
    };
  });

})();
