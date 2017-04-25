// Routing for chart page
module.exports = function (app) {
    var fnRoute = function () {
        return function (request, response) {
            var data = {
                title: 'Frequency Chart',
                controller: 'chartController as chartCtrl'
            };

            response.render('chart', data, function (error, view) {
                response.send(view);
            });
        }
    };

    // Route to chart page
    app.route('/chart').get(fnRoute());
};
