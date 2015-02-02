var express = require('express'),
  http = require('http').createServer().listen(3001),
  http2 = require('http').createServer().listen(3002),
  basicAuth = require('basic-auth-connect'),
  mqtt = require('mqtt'),
  path = require('path'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  routes = require('./routes/index'),
  conf = require('config'),
  app,
  //Websocketモジュールの準備
  ws = require('websocket.io'),
  //Server変数の準備
  server = ws.attach(http),
  server2 = ws.attach(http2),
  //データ全体を保存する配列の準備
  users = {},
  //MQTTClientの用意
  mqttClient = mqtt.connect(),
  //温度を保存しておく
  temp = "0";
app = express();

// view engine setup
app.set('port',3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(basicAuth(conf.username,conf.password));// ./config/default.jsonファイルのusername・password参照。書き方はdefault_sample.jsonを参照
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
    "y":undefined,
    "text":""
  };
  console.log("connect");

  client.send(JSON.stringify({
    "id" : id,
    "users" : users,
    "temp" : temp
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
    if(message.x !== undefined){
      users[id]['x'] = message.x;
    }
    if(message.y !== undefined){
      users[id]['y'] = message.y;
    }
    if(message.text !== undefined){
      users[id]['text'] = message.text;
      console.log(users[id]['text']);
    }
//    console.log(users);
    server.clients.forEach(function(client){
      if(client !== null && client.send !== null){
        client.send(JSON.stringify({
          'users':users,
          'temp':temp
        }));
      }
    });
  });

  client.on('disconnect', function(){
    delete users[id];
    console.log('connection.disconnect');
    /*
    server.clients.forEach(function(client){
      if (client) {
        client.send(JSON.stringify({
          'users':users,
          'temp':temp
        }));
      }
    });
    */
  });
  client.on('close', function(){
    delete users[id];
    /*
    console.log('connection.close');
    server.clients.forEach(function(client){
      if (client) {
        client.send(JSON.stringify({
          'users':users,
          'temp':temp
        }));
      }
    });
    */
  });
});

mqttClient.subscribe('temp');

mqttClient.on('message', function (topic, message) {
  temp = message.toString();
});


server2.on('connection',function(client){
  client.on('message',function(data){
    server2.clients.forEach(function(client){
      console.log(data);
      client.send(data);
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
