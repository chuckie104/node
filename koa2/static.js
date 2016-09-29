"use strict"

const path = require("path");

const mime = require("mime");

const fs = require("mz/fs");

function staticFiles(url,dir){
  //
  return async (ctx,next)=>{
      //拿到请求的路劲
      var rpath = ctx.request.path;
      //匹配是否是静态文件下的路径
      if(rpath.startsWith(url)){
        //拼接完整路径
        var fp= path.join(dir,rpath.substring(url.length))
        //判断文件是否存在
        if(await fs.exists(fp)){
          //查找文件的mime
          ctx.response.type= mime.lookup(rpath);
          //把文件加载到页面
          ctx.response.body=await fs.readFile(fp);
        }else{
          //文件不存在
          ctx.response.status=404;
        }
      }else{
        await next();
      }
  };
}

module.exports= staticFiles;
