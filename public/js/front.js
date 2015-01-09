(function(){
  var ws = new WebSocket("ws://" + location.hostname + ":3001/"),
  canvas = document.getElementById('canvas'),
  sheep = document.getElementById('sheep'),
  ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgba(255,255,255,0)';

  ws.onmessage = function(e){
    var array = JSON.parse(e.data);
    console.log(array);
    ctx.drawImage(sheep,array['x']-50,array['y']-50,100,100);
  };

  ws.onclose = function(e){
    console.log("disconnect");
    console.log(e);
  };

  canvas.onmousedown = function(e){
    var array = {
      x : e.clientX,
      y : e.clientY 
    };
    ws.send(JSON.stringify(array));
  };
})();
