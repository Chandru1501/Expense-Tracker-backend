const Users = require('../model/users');
const expenses = require('../model/expenses');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const sequelize = require('../utils/database');

exports.addUser = async function (req,res,next){
    const t = await sequelize.transaction();
   console.log(req.body);
   const name = req.body.username;
   const EmaiL = req.body.email;
   const password = req.body.password;

   let saltRounds = 10;
bcrypt.hash(password,saltRounds,async function (err,hash) {
    if(err){
        console.log(err);
    }
    else{
        try{
       let email = await Users.findOne({where : {Email:EmaiL}})
       if(email==null){
              await Users.create({
                 Username : name,
                 Email : EmaiL,
                 Password : hash,
                 isPremiumuser : "false",
                 totalExpense : 0
               },{transaction : t})
               .then(()=>{
                  t.commit();
                    res.json({
                    duplicate : false
                    })
               })
       }
       else{
           res.status(409).json({
               duplicate : false
              })
         }
    }
    catch(err){
        t.rollback();
       console.log(err);
       }  
     }
  })
}

exports.Login = async function (req,res,next){
    try{
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    let userDataInDB;
    //console.log(req.body);
   let user = await Users.findOne( { where : {Email : userEmail } } )
        userDataInDB = user;
        console.log(userDataInDB);
        if(!user){
            res.status(404).json({
                status : "userNotFound"
            })
        }
        else{
            let userPasswordInDB = userDataInDB.Password;
            let usernameInDB = userDataInDB.Username;
            let isPremiumuser = userDataInDB.isPremiumuser;

            bcrypt.compare(userPassword,userPasswordInDB,(err,result)=>{
                console.log("matched "+result);
                if(result==true){
                    let token = generateAccessToken(userDataInDB);
                    res.status(200).json({
                        status : "login Successfull",
                        token : token,
                        username : usernameInDB,
                    })

                    function generateAccessToken(userdata){
                        return jwt.sign({ Id : userdata.Id , name : userdata.Username , isPremiumuser : isPremiumuser },process.env.TOKEN_SECRECT);
                    }
                }
                else if(result==false){
                    console.log("not matched");
                    res.status(401).json({
                        status : "wrongpassword"
                    })
                }
            })
        }
    }
    catch(err) {
    console.log(err);
  }
}



exports.addExpense = async function (req,res,next){
    const t = await sequelize.transaction();

    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;
    // from req headers
    const userId = req.user.Id;
    console.log("from add expense controller ");

    try{
    let user = await Users.findAll( { where : {Id:userId}})
        let total = user[0].TotalExpense + + amount; 
        user[0].update({TotalExpense : total});
        user[0].createExpense({
               amount : amount,
               description : description,
               category: category,
        },{transaction : t})
        .then(async function(){
             await t.commit();
            console.log('updated successfully');
        })
       }
        catch(err){
            await t.rollback();
          console.log(err)
        }
    }

exports.getExpenses = async function (req,res,next){
    try{
    console.log("from get expenses controller ");
    let userId = req.user.Id;
    let User;
    let username;
    let user = await Users.findOne({where : {Id:userId}})
        User=user;
     username = user.Username;
    let expense = await user.getExpenses()
        res.status(200).json({headers : {isour : User.isPremiumuser},expense});
   }
   catch(err){
       console.log(err);
   }
    
}

exports.deleteExpense = async function (req,res,next) {
    try{
    let userId = req.user.Id;
    let expenseid = req.params.expenseId;
    console.log("expense ID ",expenseid);
    console.log("user Id ",userId);
    let user = await Users.findOne({ where : { id : userId }})
        let Oldtotal = user.TotalExpense; 
        let newtotal;
      let expenseToDelete = await user.getExpenses({where : {id:expenseid}})
         newtotal = Oldtotal - expenseToDelete[0].amount;
         user.update({TotalExpense : newtotal});
         expenseToDelete[0].destroy();
         console.log("expense deleted");
         res.status(200)
    }
    catch(err){
        console.log(err);
    }
}

exports.getDetails = async function (req,res,next){
    try{
 let userId = req.user.Id;
 
 let user = await Users.findOne({where : {Id : userId}})
     console.log(user.isPremiumuser);
     res.status(200).json({isour : user.isPremiumuser})
 }
 catch(err){
    console.log(err); 
  }
}
    

