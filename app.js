var express = require('express'),
  http = require('http').createServer().listen(3001),
  path = require('path'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  routes = require('./routes/index'),
  app,
  //Websocketモジュールの準備
  ws = require('websocket.io'),
  //Server変数の準備
  server = ws.attach(http),
  //データ全体を保存する配列の準備
  users = {};

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


server.on('connection',function(client){
  var id = client.req.headers['sec-websocket-key'];
  users[id] = {
    "x":undefined,
    "y":undefined
  };
  console.log("connect");

  client.send(JSON.stringify({
    "id" : id,
    "users" : users
  }));
  //console.log(client);
//  setInterval(function(){
//    client.send('{"Welcome!"}');
//  },5000);

  client.on('message',function(data){
    var message= JSON.parse(data);
//    console.log(users);
//    console.log(message);
//    console.log(id);
    users[id]["x"] = message["x"];
    users[id]["y"] = message["y"];
//    console.log(users);
    server.clients.forEach(function(client){
      client.send(JSON.stringify({'users':users}));
    });
  });

  client.on('disconnect', function(){
    delete users[id];
    console.log('connection.disconnect');
    server.clients.forEach(function(client){
      if (client) {
        client.send(JSON.stringify({'users':users}));
      }
    });
  });
  client.on('close', function(){
    delete users[id];
    console.log('connection.close');
    server.clients.forEach(function(client){
      if (client) {
        client.send(JSON.stringify({'users':users}));
      }
    });
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
