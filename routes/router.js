// Route through the application
module.exports = function (app) {

  // Route to home page
  require('./home.js')(app);

  // Route to table page
  require('./table.js')(app);

  // Route to chart page
  require('./chart.js')(app);

  // Route to error page
  require('./error.js')(app);

};
