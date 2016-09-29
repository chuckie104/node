var fn_hello=async (ctx,next)=>{
    var name=ctx.params.name;
    ctx.request.body=`<h1>hello,${name}</h1>`;
}

module.exports={
  'GET /hello/:name':fn_hello
}
