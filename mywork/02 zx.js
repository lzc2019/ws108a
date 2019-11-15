const serve = require('koa-static');  
const Koa = require('koa');  
const app = new Koa();  

app.use(serve(__dirname + '/public'));  

app.use(async function(ctx) {
    const fpath = path.join(__dirname, ctx.path);
    const fstat = await fs.promises.stat(fpath);
    
  })

app.listen(3000); 