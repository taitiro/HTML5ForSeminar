var express = require('express'),
  http = require('http').createServer().listen(3001),
  path = require('path'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
//Websocketモジュールの準備
  ws = require('websocket.io'),
//Server変数の準備
  server= ws.attach(http),
  routes = require('./routes/index'),
  users = require('./routes/users'),
  app;

app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);


server.on('connection',function(client){
  console.log("connect");
  //console.log(client);
//  setInterval(function(){
//    client.send('{"Welcome!"}');
//  },5000);

  client.on('message',function(data){
    var array = JSON.parse(data);
    console.log('x = '  + array['x']);
    console.log('y = '  + array['y']);
    //if ( array['x'] > 50 && array['y'] > 50 ) {
      console.log("test");
      server.clients.forEach(function(client){
        client.send(JSON.stringify(array));
      });
    //}
  });

  client.on('disconnect', function(){
    console.log('connection.disconnect');
  });
  client.on('close', function(){
    console.log('connection.close');
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
