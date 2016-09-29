const nunjucks = require("nunjucks");

function createEnv(path,opts){
  var
      autoscape = opts.autoscape && true,
      noCache = opts.noCache || false,
      watch = opts.watch || false,
      throwOnUndefined = opts.throwOnUndefined || false,
      env = new nunjucks.Environment(
        new nunjucks.FileSystemLoader("views",{
          noCache:noCache,
          watch:watch
        }),{
          autoscape:autoscape,
          throwOnUndefined:throwOnUndefined
        });

        if(opts.filters){
          for(var f in opts.filters){
            env.addFilter(f, opts.filters[f])
          }
        }

        return env;
}

function templating(path,opts){
  //创建Nunjunks对象
  var env = createEnv(path, opts);

  return async(ctx,next)=>{
    ctx.render=function(view,model){
      // 把render后的内容赋值给response.body:
      ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}));
      // 设置Content-Type:
      ctx.response.type = 'text/html';
    };
    await next();
  }
}

module.exports = templating;
