const Users = require('../model/users');
const expenses = require('../model/expenses');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

exports.addUser = (req,res,next) =>{
   console.log(req.body);
   const name = req.body.username;
   const email = req.body.email;
   const password = req.body.password;

   let saltRounds = 10;
bcrypt.hash(password,saltRounds,(err,hash)=>{
    if(err){
        console.log(err);
    }
    else{
        Users.create({
          Username : name,
          Email : email,
          Password : hash
     })
        .then(()=>{
         res.json({
             duplicate : false
            })
        })
        .catch(error=>{
         console.log(error);
         res.status(409).json({
             duplicate : true
            })
        })
    }
})   
}

exports.getUser = (req,res,next) =>{
    const email = req.params.Email;
    console.log(email);
}

exports.Login = (req,res,next)=>{
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    let userDataInDB;
    //console.log(req.body);
    Users.findOne( { where : {Email : userEmail } } )
    .then((user)=>{
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
            bcrypt.compare(userPassword,userPasswordInDB,(err,result)=>{
                console.log("matched "+result);
                if(result==true){
                    let token = generateAccessToken(userDataInDB);
                    res.status(200).json({
                        status : "login Successfull",
                        token : token,
                        username : usernameInDB
                    })

                    function generateAccessToken(userdata){
                        return jwt.sign({ Id : userdata.Id , name : userdata.Username },"this_is_my_secrect_key_To_get_in_my_server!!!!!");
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
    })
        .catch(err=>console.log(err));
}



exports.addExpense = (req,res,next)=>{
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;
    // from req headers
    const userId = req.user.Id;

    console.log("from add expense controller ");
    Users.findOne( { where : {Id:userId}})
    .then((user)=>{

        user.createExpense({
               amount : amount,
               description : description,
               category: category
        })
        .then((response)=>{
           console.log('updated successfully');
        })
        .catch(err => console.log(err));
    })
}

exports.getExpenses = (req,res,next)=>{
    console.log("from get expenses controller ");
    let userId = req.user.Id;
    let username;
    Users.findOne({where : {Id:userId}})
    .then((user)=>{
     //console.log(user);
     username = user.Username;
     user.getExpenses()
     .then((expense)=>{
        //console.log(expense);
        res.status(200).json(expense);
     })
    })
   .catch(err=>console.log(err));
}

exports.deleteExpense = (req,res,next)=>{
    let userId = req.user.Id;
    let expenseid = req.params.expenseId;
    console.log("expense ID ",expenseid);
    console.log("user Id ",userId);
     Users.findOne({ where : { id : userId }})
    .then((user)=> {
       user.getExpenses({where : {id:expenseid}})
       .then((expenseToDelete)=>{
        console.log(expenseToDelete[0]);
         expenseToDelete[0].destroy();
         console.log("expense deleted");
         res.status(200)
       })
    })
    .catch(err=> console.log(err));
}
    

