var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// mySQL and TDS (Tedious)
var Connection = require("tedious").Connection;
var Request = require("tedious").Request;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// mySQL
// example: https://docs.microsoft.com/en-us/sql/connect/node-js/step-3-proof-of-concept-connecting-to-sql-using-node-js?view=sql-server-ver15
var Connection = require('tedious').Connection;  
var config = {  
  server: 'localhost',  //update me
  authentication: {
    type: 'default',
    options: {
      userName: 'admin', //update me
      password: 'admin5',  //update me
      validateBulkLoadParameters: 'false'
    }
  },
  options: {
  // If you are on Microsoft Azure, you need encryption:
      encrypt: true,
      database: 'Database1'  //update me
  }
};
var connection = new Connection(config);  
connection.on('connect', function(err) {  
  // If no error, then good to proceed.
  console.log("Connected");  
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
