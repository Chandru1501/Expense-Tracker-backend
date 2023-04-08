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
    res.status(409).json({
        duplicate : true
    })
   })
}

exports.getUser = (req,res,next) =>{
    const email = req.params.Email;
    console.log(email);
}

exports.Login = (req,res,next)=>{
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    let userData;
    console.log(req.body);
    Users.findOne( { where : {Email : userEmail } } )
    .then((user)=>{
        userData = user;
        if(!user){
            res.status(404).json({
                status : "userNotFound"
            })
        }
        else{
          let userPw = userData.Password
          console.log(userPw!=userPassword)
          if(userPw!=userPassword){
            res.status(401).json({
                status : "wrongpassword"
            })
          }
          else if (userPw==userPassword){
            res.json({
                status : "login Successfull"
            })
          }
        }
    })
    .catch(err=>console.log(err));

}