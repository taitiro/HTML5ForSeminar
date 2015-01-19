(function(){
  var ws,
  socketId,
  text = "";
  canvas = document.getElementById('canvas'),
  sheep = document.getElementById('sheep'),
  button = document.getElementById('speek'),
  ctx = canvas.getContext('2d');

  window.onload = init();

  function init(){
    var _click =  (window.ondrop === undefined) ? 'touchstart' : 'mousedown';
    // フォント
    ctx.font = "bold 12px 'Arial'";
    // テキストの行揃え
    ctx.textAlign = 'left';
    // テキストのベースライン
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(255,255,255,0)';
    canvas.addEventListener(_click, tapCanvas);
    if(canvas.ondragover !== undefined){
      canvas.ondragover = function(e){
        e.preventDefault();
      }
      canvas.addEventListener("drop", tapCanvas);
    }
    ws = new WebSocket("ws://" + location.hostname + ":3001/");
    console.log(ws);
    ws.onmessage = getMessage;
    ws.onclose = closeOrDisconnect;
    speek.onclick = initSpeek;
  }


  function getMessage(e) {
    var message = JSON.parse(e.data);
    console.log(e);
    if((message['id'] !== null) && (message['id'] !== undefined)) {
      socketId = message['id'];
    }
    draw(message);
  };

  function closeOrDisconnect(e){
    console.log("disconnect");
    console.log(e);
  };

  function dropCanvas(e){
    tapcanvas(e);
    e.preventDefault();
  }

  function tapCanvas(e){
    var array = {
      'x' : e.clientX,
      'y' : e.clientY - 100,
      'text' : text
    };
    console.log(array);
    if(sheep.style.display !== "none"){
      sheep.style.display = "none";
    }
    ws.send(JSON.stringify(array));
  };

  function draw(message){
    var i,x,y,
        data = message.users
        temp = message.temp;
    console.log(message);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = '#000000';
    ctx.fillText(temp.toString() + "℃", 30, 10);
    for ( uid in data ) {
      if(data[uid]['x'] !== undefined) {
        x = data[uid]['x'];
        y = data[uid]['y'];
        console.log("drawimage");
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
       ctx.fillText(data[uid]['text'], x + 50, y - 87.5);
      }
    };
    ctx.fillStyle = 'rgba(255,255,255,0)';
  }

  function initSpeek(){
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || undefined,
        recognition;
    if(SpeechRecognition !== undefined){
      recognition = new SpeechRecognition();
      recognition.value="ja-JP";
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.onresult = function (e) {
        var tempText = '';
        for (var i = 0; i < e.results.length; i++) {
          tempText = e.results[i][0].transcript;
        }
        console.log(tempText);
        if(tempText !== text && tempText !== ''){
          text = tempText;
          ws.send(JSON.stringify({'text':text}));
        }
      };
      // 音声認識開始
      recognition.start();
      button.textContent="話してみよう！";
    }else{
      button.textContent="残念！あなたのブラウザは対応外です";
    }
    button.disabled = true;
  }
})();
