const User = require('../model/users');
const Expenses = require('../model/expenses');
const sequelize = require('../utils/database');
const Sequelize = require('sequelize');


exports.getLeaderboard = async function(req,res,next){
    console.log(req.user);
    let user = req.user;
    let thisuser = await User.findAll({where : {Id:req.user.Id}});
    console.log(thisuser);
    if(thisuser[0].isPremiumuser==="true"){
    try{
        let user = await User.findAll({
            attributes : ['Username','TotalExpense']
        })
         console.log(user[0]);
         let data = user.sort((a,b)=> b.TotalExpense - a.TotalExpense)
         res.status(200).json(data);
      }
   catch(err){
      console.log(err);
   }
}
else{
    res.status(404).json({message : "hay dont cheat us"});
    console.log("not premium");
}
}
    


//        // leaderBoardarray.sort((a, b) => b.amount - a.amount)
//      console.log(leaderBoardarray);
//     }

// }