// Routing for home page
module.exports = function (app) {
    var fnRoute = function () {
        return function (request, response) {
            var data = {title: 'Home', controller: 'homeController as homeCtrl'};

            response.render('home', data, function (error, view) {
                response.send(view);
            });
        }
    };

    // Route to home page
    app.route('/').get(fnRoute());
};
