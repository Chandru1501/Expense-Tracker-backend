const Users = require('../model/users');
const expenses = require('../model/expenses');
const bcrypt = require('bcrypt');

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
    console.log(req.body);
    Users.findOne( { where : {Email : userEmail } } )
    .then((user)=>{
        userDataInDB = user;
        //console.log(userDataInDB);
        if(!user){
            res.status(404).json({
                status : "userNotFound"
            })
        }
        else{
            let userPasswordInDB = userDataInDB.Password
            bcrypt.compare(userPassword,userPasswordInDB,(err,result)=>{
                console.log("matched "+result);
                if(result==true){
                    res.json({
                        status : "login Successfull"
                    })
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
    expenses.create({
       amount : amount,
       description : description,
       category: category
    })
    .then((response)=>{
       console.log('updated successfully');
    })
    .catch(err => console.log(err));
}

exports.getExpenses = (req,res,next)=>{
    expenses.findAll()
    .then((data)=>{
       res.json(data);
       console.log(data);
    })
    .catch(err=> console.log(err));
}

exports.deleteExpense = (req,res,next)=>{
    let expenseid = req.params.expenseId;
    console.log(expenseid);
    expenses.findOne({where : { id : expenseid }})
    .then((expense)=> {
       expense.destroy();
       console.log("expense deleted");
    })
    .catch(err=> console.log(err));
}
    

