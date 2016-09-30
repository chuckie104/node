
const insertUser = require("../sequelize");

var registerSuccess=async (ctx,next)=>{
  var username=ctx.request.body.username;
  var email =ctx.request.body.email;
  var password =ctx.request.body.password;

    var padge=await insertUser.insert(email,password,username);

    if(padge==true){
      ctx.render("signin-ok.html",{
        title:"注册成功",
        name:username
      })
    }else{
      ctx.render("signin-faild.html",{
        title:"注册不成功",
      })
    }
}

module.exports={
  "POST /registerSuccess":registerSuccess
};
