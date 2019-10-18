const Koa = require('koa');  //伺服器
const fs = require('fs')   //读取文档
const MarkdownIt = require('markdown-it')  //md转换为html
const mdit = new MarkdownIt()  

const app = module.exports = new Koa();
const path = require('path');   //路径
const extname = path.extname;

app.use(async function(ctx) {
  const fpath = path.join(__dirname, ctx.path);
  const fstat = await fs.promises.stat(fpath);
  console.log('fpath=', fpath)
  if (fstat.isFile()) {
    let ext = extname(fpath)  //取得副档名
    // console.log('ext=', ext)
    if (ext === '.md') {  //判定副档名是不是md，若是md则：
      let md = await fs.promises.readFile(fpath, 'utf8')  //将整个档案读取成字串放在md里
      let html = mdit.render(md) //转化为html
      ctx.type = '.html'  //设定这个档案是html
      ctx.body = html  //传回
    } else {  //若是html则：
      ctx.type = ext //回传变数ext
      ctx.body = fs.createReadStream(fpath)//串流传回
    }
  }
})

if (!module.parent) {
  app.listen(3000)
  console.log('server run at http://localhost:3000/')
}
