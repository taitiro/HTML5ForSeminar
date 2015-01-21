var i2c = require('i2c'),
    mqtt = require('mqtt'),
    WebSocket = require('ws'),
    exec = require('child_process').exec,
    ADDRESS = 0x48,
    tempValue=0,
    child,
    client,
    flag,
    ws;

    function init(){
      sensor = new i2c(ADDRESS, {device: '/dev/i2c-1'});
      client = mqtt.connect('mqtt://104.155.192.253:1883/');
      //client = mqtt.connect('mqtt://hogehoge.com');
      ws = new WebSocket('ws://104.155.192.253:3001/');
      ws.on('connect',wsOnconnect);
      ws.on('message',wsOnmessage);
      ws.on('error',wsOnerror);
//    readValue(null);
      client.publish('temp',tempValue.toString());
      console.log("init");
      exec('echo 2=10% > /dev/servoblaster');
      setInterval(calTemperature,10000);
    }

    
    // read from ADT7410
    function calTemperature(){
      sensor.readBytes(0x00, 2, function(err, data) {
        var temp;
        temp = (data[0] << 8 | data[1]) >> 3;
        if (temp >= 4096) {
        temp -= 8192;
        }
        tempValue = temp * 0.0625;
        console.log(tempValue + "度");
        client.publish('temp',tempValue.toString());
      });
    };

    function wsOnconnect(){
      console.log('connect');
    };

    function wsOnmessage(data){
      console.log('message');
      if(flag){
        exec('echo 2=30% > /dev/servoblaster');
      }else{
        exec('echo 2=60% > /dev/servoblaster');
      }
      flag = !flag;
    };

    function wsOnerror(data){
      exec('echo 2=90% > /dev/servoblaster');
      console.log('error');
    };

    init();
