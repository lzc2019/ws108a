const Koa = require('koa'); //伺服器

const app = module.exports = new Koa();  //利用koa创建的物件（应用程序）

app.use(async function pageNotFound(ctx) {  //浏览器触发请求传回的内容
  // we need to explicitly set 404 here
  // so that koa doesn't assign 200 on body=
  ctx.status = 404
});

if (!module.parent) app.listen(3000);  //启动伺服器
