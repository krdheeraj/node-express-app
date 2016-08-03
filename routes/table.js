// Routing for table page
module.exports = function (app) {

  var fnRoute = function () {
    return function (request, response) {
      var data = {
        title: 'Employee Table',
        controller: 'tableController as tableCtrl'
      };

      response.render('table', data, function (error, view) {
        response.send(view);
      });
    }
  };

  // Route to table page
  app.route('/table').get(fnRoute());

};
