const jwt = require('jsonwebtoken');
const User = require('../model/expenses');

exports.authendicate = (req,res,next) => {
    try{
    let token =req.header("authorization");
    console.log("Token : ",token);
    let ReqUser = jwt.verify(token,"this_is_my_secrect_key_To_get_in_my_server!!!!!")
    console.log("from middle ware  ",ReqUser)
     
    req.user = ReqUser;
    next();
  }
    catch(err){
      console.log(err);
    }
}

