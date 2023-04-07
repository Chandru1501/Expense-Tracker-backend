const Users = require('../model/users');

exports.addUser = (req,res,next) =>{
   console.log(req.body);
   const name = req.body.username;
   const email = req.body.email;
   const password = req.body.password;
   Users.create({
     Username : name,
     Email : email,
     Password : password
   })
   .then(()=>{
    res.json({
        duplicate : false
    })
   })
   .catch(err=>{
    console.log(err);
    res.json({
        duplicate : true
    })
   })
}

exports.getUser = (req,res,next) =>{
    const email = req.params.Email;
    console.log(email);
}