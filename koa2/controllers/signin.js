
const selectUser = require("../sequelize");

var signin = async (ctx,next)=>{
  var
      email = ctx.request.body.email ||"",
      password= ctx.request.body.password || "";

      var object =await selectUser(email);



      if(email ==object[0].email && password ==object[0].password){
        var name = object[0].username || "new user";
        //登录成功
        ctx.render("signin-ok.html",{
          title:"ok",
          name:name
        });
      }else{
        //登录失败
        ctx.render("signin-faild.html",{
          title:"sign in failed"
        });
      }
}

module.exports={
  "POST /signin":signin
}
