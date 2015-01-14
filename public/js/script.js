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
    var x,y;
    console.log(sheeps);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = '#000000';
    for ( uid in sheeps) {
      if(sheeps[uid]['x'] !== undefined) {
        x = sheeps[uid]['x'];
        y = sheeps[uid]['y'];
        ctx.drawImage(sheep,x-50,y-50,100,100);
        ctx.beginPath();
        ctx.moveTo(x + 75, y - 125);//x = 75 y = 25
        ctx.quadraticCurveTo(x + 25, y - 125, x + 25, y - 87.5);
        ctx.quadraticCurveTo(x + 25, y - 50, x + 50 , y - 50);
        ctx.quadraticCurveTo(x + 50, y - 30, x + 30, y - 25);
        ctx.quadraticCurveTo(x + 60, y - 30, x + 75, y - 50);
        ctx.quadraticCurveTo(x + 125, y - 50, x + 125, y - 87.5);
        ctx.quadraticCurveTo(x + 125, y - 125, x + 75, y - 125);
        ctx.stroke();
        // 塗りの色
        // フォント
        ctx.font = "bold 12px 'Arial'";
        // テキストの行揃え
        ctx.textAlign = 'left';
        // テキストのベースライン
        ctx.textBaseline = 'middle';
        ctx.fillText("test", x + 50, y - 87.5);
      }
    };
    ctx.fillStyle = 'rgba(255,255,255,0)';
  }
})();
