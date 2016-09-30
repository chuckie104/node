
var register=async (ctx,next)=>{

    ctx.render("register.html",{
      title:"register"
    })
}

module.exports={
  "GET /register":register
}
