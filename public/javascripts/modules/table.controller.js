(function () {

  'use strict';

  nodeApp.controller('tableController', function ($rootScope) {
    var tableCtrl = this;
    tableCtrl.showTable = true;
    tableCtrl.pageSize = '50';
    tableCtrl.pageNumber = '1';
    tableCtrl.changeValue = function() {
      $rootScope.$emit('changeValue');
    };
  });

})();