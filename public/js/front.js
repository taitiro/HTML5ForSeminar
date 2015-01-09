(function(){
  var ws = new WebSocket("ws://" + location.hostname + ":3001/"),
  canvas = document.getElementById('canvas'),
  ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgba(255,255,255,0)';

  ws.onmessage = function(e){
    console.log(e);
  };

  ws.onclose = function(e){
    console.log("disconnect");
    console.log(e);
  };

  canvas.onmousedown = function(e){
    var xy = "X=" + e.clientX + ";Y=" + e.clientY + ";";
    ws.send(xy);
  };
})();
