'use strict';

(function() {

  var socket = io('http://localhost:3000')  // var socket = io(); 改成新版 socket.io 2.0 的語法
  var canvas = document.getElementsByClassName('whiteboard')[0];
  var colors = document.getElementsByClassName('color');
  var context = canvas.getContext('2d');

  var current = {
    color: 'black'
  };
  var drawing = false;

  canvas.addEventListener('mousedown', onMouseDown, false);
  canvas.addEventListener('mouseup', onMouseUp, false);
  canvas.addEventListener('mouseout', onMouseUp, false);
  canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);

  for (var i = 0; i < colors.length; i++){
    colors[i].addEventListener('click', onColorUpdate, false);
  }

  socket.on('drawing', onDrawingEvent);

  window.addEventListener('resize', onResize, false);  //視窗調整時觸發的事情
  onResize();


  function drawLine(x0, y0, x1, y1, color, emit){
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.strokeStyle = color;
    context.lineWidth = 2;
    context.stroke();
    context.closePath();

    if (!emit) { return; }
    var w = canvas.width;
    var h = canvas.height;

    socket.emit('drawing', {
      x0: x0, // x0 / w,
      y0: y0, // y0 / h,
      x1: x1, //x1 / w,
      y1: y1, //y1 / h,
      color: color
    });
  }

  const rect = canvas.getBoundingClientRect();

  function onMouseDown(e){
    drawing = true;
    current.x = e.clientX - rect.left; // e.clientX;
    current.y = e.clientY - rect.top; // e.clientY;
  }

  function onMouseUp(e){
    if (!drawing) { return; }
    drawing = false;
    drawLine(current.x, current.y, e.clientX - rect.left, e.clientY - rect.top, current.color, true);
  }

  function onMouseMove(e){
    if (!drawing) { return; }
    drawLine(current.x, current.y, e.clientX - rect.left, e.clientY - rect.top, current.color, true);
    current.x = e.clientX - rect.left;
    current.y = e.clientY - rect.top;
  }

  function onColorUpdate(e){  //偵測顏射改變
    current.color = e.target.className.split(' ')[1];
  }

  // limit the number of events per second
  function throttle(callback, delay) {  //限制每秒的事件數
    var previousCall = new Date().getTime();
    return function() {
      var time = new Date().getTime();

      if ((time - previousCall) >= delay) {  //時間間隔 只有大於delay的操作才會執行
        previousCall = time;
        callback.apply(null, arguments);
      }  
    };
  }

  function onDrawingEvent(data){
    var w = canvas.width;
    var h = canvas.height;
    // drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
    drawLine(data.x0, data.y0, data.x1, data.y1, data.color);
  }

  // make the canvas fill its parent
  function onResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

})(); //呼叫匿名函數
