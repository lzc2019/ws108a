
const Koa = require('koa')
const app = new Koa()
const serve = require('koa-static')
const http = require('http').Server(app.callback())
const io = require('socket.io')(http)
const port = process.env.PORT || 3000

app.use(serve(__dirname + '/public'));//匯出這個事件

function onConnection(socket){
  socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));//前端
}

io.on('connection', onConnection);

http.listen(port, () => console.log('listening on port ' + port));

app.use(async function(ctx, next){
  ctx.type = 'html'
  ctx.body = fs.createReadStream(__dirname + '/index.html') //傳回此檔案
})

io.on('connection', function(socket){ // 當有人連進來，就回呼這個函數
  socket.on('chat message', function(msg){ //偵測別人發消息的事件，取得信息
    console.log('msg:', msg)  //顯示信息
    io.emit('chat message', msg)  //發消息
  })
})