const jwt = require('jsonwebtoken');
const User = require('../model/expenses');
require("dotenv").config()

exports.authendicate = (req,res,next) => {
    try{
    let token =req.header("authorization");
    console.log("Token : ",token);
    let ReqUser = jwt.verify(token,process.env.TOKEN_SECRECT)
    console.log("from middle ware  ",ReqUser)
     
    req.user = ReqUser;
    next();
  }
    catch(err){
      res.status(404).json({"message" : "you are not our user" })
      console.log(err);
    }
}

