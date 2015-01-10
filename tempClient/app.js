var i2c = require('i2c'),
    mqtt = require('mqtt'),
    WebSocket = require('ws'),
    exec = require('child_process').exec,
//    client = mqtt.connect('mqtt://yourdomain:1883'),
    ADDRESS = 0x5c,
    INTERVAL = 60*1000, // mili-sec
    child,
    flag,
    ws = new WebSocket('ws://104.155.192.253:3001/');

    sensor = new i2c(ADDRESS, {device: '/dev/i2c-1'});

    // read from ADT7410
    readValue = function(callback) {
      sensor.readBytes(0x00, 2, function(err, data) {
          var temp, value;
          console.log(data);
          temp = (data[0] << 8 | data[1]) >> 3;
          if (temp >= 4096) {
          temp -= 8192;
          }
          value = temp * 0.0625;
          console.log("Temperature: " + value + " [Deg. C.]");
          //callback(value);
          });
    };

    ws.on('message',function(data){
      console.log('message');
      if(flag){
        exec('echo 0=30% > /dev/servoblaster');
      }else{
        exec('echo 0=60% > /dev/servoblaster');
      }
      flag = !flag;
    });

//    readValue(null);
