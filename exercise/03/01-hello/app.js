const Koa = require('koa');  //伺服器
const app = module.exports = new Koa();  //利用koa创建的物件（应用程序）

app.use(async function(ctx) { //浏览器触发请求传回的内容
  console.log('url=', ctx.url) //观察请求的网址
  ctx.body = 'Hello World';  //传回输入的文字
});

if (!module.parent) app.listen(3000); //启动伺服器
