var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var handlers = require('./handlers');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(function(req, res, next){
  var protocol = req.protocol;
  var hostHeaderIndex = req.rawHeaders.indexOf('Host') + 1;
  var host = hostHeaderIndex?req.rawHeaders[hostHeaderIndex]:undefined;
  Object.defineProperty(req, 'origin', {
  get: function(){
    if( !host ){
      return req.headers.referer?req.headers.referer.substring(0, req.headers.referer.length-1):undefined;  
    }else{
      return protocol + '://' + host;
    }
  }
  });
  next();
});

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', req.origin);
  
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  
  // Pass to next layer of middleware
  next();
});

app.use('/', handlers);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(`
    <h1> Oh geeze, there was an error. </h1>
    <br/>
    <img src="https://media.giphy.com/media/l46Cg6c3B9sTSyPdu/giphy.gif"/>
    <pre>
    ${err}
    </pre>
  `);
});

module.exports = app;
