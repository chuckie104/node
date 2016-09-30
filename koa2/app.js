"use strict"

const Koa = require("koa");

const app = new Koa();

const bodyParser= require("koa-bodyparser");

const controller=require("./controller");

const templating = require("./templating");

const isProduction = process.env.NODE_ENV ==="production";

//第一个middleware
app.use(async (ctx,next)=>{
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var
        start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
})

//第二个
if (! isProduction) {
    let staticFiles = require('./static');
    app.use(staticFiles('/static/', __dirname + '/static'));
}

//第三个
app.use(bodyParser());

//第四个
app.use(templating('view', {
    noCache: !isProduction,
    watch: !isProduction
}));

//第五个执行控制器路由分发
app.use(controller());


//监听8080端口
app.listen(8080);
console.log('app started at port 8080...');
