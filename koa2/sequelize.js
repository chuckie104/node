const Sequelize = require('sequelize');
const config = require('./config');

var sequelize = new Sequelize(config.database,config.username,config.password,{
  host:config.host,
  dialect:"mysql",
  pool:{
    max:5,
    min:0,
    idle:30000
  }
})

var Pet = sequelize.define("t_user",{
  id:{
      type:Sequelize.STRING(50),
      primaryKey:true
  },
  email:Sequelize.STRING(255),
  password:Sequelize.STRING(255),
  username:Sequelize.STRING(255),
},
  {
    timestamps:false
  }
);

var selectUser = async (name) =>{
    var pets = await Pet.findAll({
      where:{
        email:name
      }
    })
    console.log(`find ${pets.length} pets:`);
    console.log(pets);
    for (var p of pets) {
        console.log(JSON.stringify(p));
    }
    return pets;
}

module.exports=selectUser;
