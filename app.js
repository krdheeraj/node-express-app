// Node dependencies
var express = require('express');
var path = require('path');
var favIcon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Configure app object
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('runApp', false);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false,
  debug: true,
  outputStyle: 'compressed',
  sourceMap: true
}));

app.use(express.static(path.join(__dirname, 'public')));

if (app.get('runApp')) require('./routes/router.js');

module.exports = app;
