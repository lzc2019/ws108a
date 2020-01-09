var Koa = require('Koa')
var app = new Koa()
var fs = require('fs')
const server = require('http').createServer(app.callback())
var io = require('socket.io')(server)
var port = process.env.PORT || 3000

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

module.exports = server.listen(port, function(){
  console.log('listening on *:' + port) //當伺服器啟動成功，顯示以下信息
})


