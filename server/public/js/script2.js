(function(){
  var ws,
      video = document.getElementById('video'),
      c1 = document.getElementById('comment1'),
      c2 = document.getElementById('comment2'),
      c3 = document.getElementById('comment3'),
      c4 = document.getElementById('comment4'),
      c5 = document.getElementById('comment5'),
      cArray = [c1,c2,c3,c4,c5];
      normal = true;

  window.onload = init();

  function init(){
    var i;
    for(i=0;i < cArray.length; i++){
      cArray[i].addEventListener("transitionend",function(e){
        this.className = 'comment-right';
        this.textContent="";
      });
    }
    video.addEventListener('click',function(){
      if(normal){
        video.setAttribute('style',' \
          border:none; \
          border-radius:0; \
          width : ' + (window.innerWidth * 0.8) + 'px; \
          height : ' + ( window.innerHeight * 0.8) + 'px; \
        ');
        document.body.setAttribute('style', 'background-color:#000');
        document.getElementById('box-left').setAttribute('style', 'background-color: #000');
        document.getElementById('box-center').setAttribute('style','background-color: #000');
        document.getElementById('box-right').setAttribute('style','background-color:#000');
        normal = false;
      }else{
        video.removeAttribute('style');
        document.body.removeAttribute('style');
        document.getElementById('box-left').removeAttribute('style');
        document.getElementById('box-center').removeAttribute('style');
        document.getElementById('box-right').removeAttribute('style');
        normal = true;
      }
     });
    ws = new WebSocket("ws://" + location.hostname + ":3002/");
    ws.onmessage = getMessage;
    document.getElementById('comment-form').onsubmit = submitComment;
  }

  function submitComment(){
    ws.send(document.getElementById('comment-input').value);
    document.getElementById('comment-input').value = '';
    return false;
  }

  function getMessage(e) {
    var i;
    for(i=0; i < cArray.length; i++){
      if(cArray[i].textContent == ""){
        cArray[i].textContent = e.data;
        cArray[i].className = 'comment-left';
        break;
      }
    }
  }
})();
