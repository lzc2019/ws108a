const Koa = require('koa')  //引用伺服器类别
const fs = require('fs')  //读取文档
const app = new Koa()  //创建伺服器物件
const path = require('path')  //路径

app.use(async function(ctx) {  //回应浏览器的请求
  const fpath = path.join(__dirname, ctx.path)//网址要求的资料夹、档案名称
  console.log('__dirname=', __dirname)//程式所在文件夹
  console.log('fpath=', fpath)//程式所在路径
  const fstat = await fs.promises.stat(fpath)//取得档案状态
  console.log('fstat=', fstat)//印出档案状态
  if (fstat.isFile()) {      //检测文件是否能打开
    ctx.type = path.extname(fpath)
    console.log('ctx.type=', ctx.type)
    ctx.body = fs.createReadStream(fpath) //把档案串流回去
  }
})

app.listen(3000)    //开启伺服器以供打开网页
console.log('server run at http://localhost:3000/')

