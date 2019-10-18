const serve = require('koa-static');  //引用套件
const Koa = require('koa');  //伺服器
const app = new Koa();  //

app.use(serve(__dirname + '/public'));  //确认路径 汇出public资料夹

app.listen(3000);  //启动伺服器

console.log('listening on port 3000');  //印出启动伺服器的信息  