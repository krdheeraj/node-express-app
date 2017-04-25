// Routing for error page
module.exports = function (app) {
    var fnRoute = function () {
        return function (request, response) {
            var data = {page: {title: 'Page not found'}};

            response.render('error', data, function (error, view) {
                response.send(view);
            });
        }
    };

    // Route to home page
    app.route('/error').get(fnRoute());
};
