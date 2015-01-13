(function(){
  var ws,
  socketId,
  canvas = document.getElementById('canvas'),
  sheep = document.getElementById('sheep'),
  ctx = canvas.getContext('2d');

  window.onload = init();

  function init(){
    var _click = (window.onmousedown === undefined) ? 'touchstart' : 'mousedown';
    ctx.fillStyle = 'rgba(255,255,255,0)';
    canvas.addEventListener(_click, tapCanvas);
    ws = new WebSocket("ws://" + location.hostname + ":3001/");
    console.log(ws);
    ws.onmessage = getMessage;
    ws.onclose = closeOrDisconnect;
  }


  function getMessage(e) {
    var message = JSON.parse(e.data);
    console.log(e);
    if((message['id'] !== null) && (message['id'] !== undefined)) {
      socketId = message['id'];
    }
    drawSheep(message['users']);
  };

  function closeOrDisconnect(e){
    console.log("disconnect");
    console.log(e);
  };

  function tapCanvas(e){
    var array = {
      'x' : e.clientX,
      'y' : e.clientY 
    };
    console.log(array);
    ws.send(JSON.stringify(array));
  };

  function drawSheep(sheeps){
    console.log(sheeps);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for ( uid in sheeps) {
      if(sheeps[uid]['x'] !== undefined) {
        ctx.drawImage(sheep,sheeps[uid]['x']-50,sheeps[uid]['y']-50,100,100);
      }
    };
  }
})();
