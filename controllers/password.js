const Users = require('../model/users');
const Sib = require('sib-api-v3-sdk');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const ForgotPasswordDB = require('../model/forgotPassword');
const sequelize = require('../utils/database');
const { error } = require('console');
const bcrypt = require('bcrypt');
const { Transaction } = require('sequelize');

exports.sendResetmail = async function (req,res,next){
  try{
    const t = await sequelize.transaction();
    console.log("reseting password");
    const uuid = uuidv4();
    console.log(uuid);
    const email = req.body.Email;
    console.log(req.body);
    let user = await Users.findOne({where : {Email : email}})
            if(user){
              console.log(user.Email);
               let Email = user.Email;
             // updating uuid to the database
             let response = await user.createForgotpassword({id:uuid},{transaction : t})
             console.log(response);
             let mailStatus = await SendEmail(Email,uuid);
             if(mailStatus){
              console.log("successs");
                 t.commit();
                 res.status(200).json({message : "Email generated"})
             }else{
                 console.log("failed");
                 t.rollback();
                 res.status(410).json({message : "Email not generated"})
             }
            }
            else{
                console.log("not found");
                res.status(404).json({
                    status : "userNotFound"
                })
            }
      }
        catch(err){
            console.log(err);
            res.status(402).json({message : "some error occured"})
        }

}

async function SendEmail(Email,uuid) {
  try {
  const client = Sib.ApiClient.instance;
  const apiKey = client.authentications['api-key'];
  apiKey.apiKey = process.env.SEND_IN_BLUE_API;
  const tranEmailApi = new Sib.TransactionalEmailsApi();
  const sender = {
    email : "chandraprakash001dpm@gmail.com",
    name : "Chandraprakash",
  }
  const receivers = [
    {
        email : Email
    },
  ]

 let response = await tranEmailApi.sendTransacEmail({
    sender,
    to : receivers,
    subject : "reset password",
    htmlcontent : `<h3>click this link to reset your password<h3><br><a href="http://localhost:8080/password/resetpassword/${uuid}">Reset_Password</a>`,
  })
   return response;
 }
  catch(err) {
    res.status(402).json({message : "some error occured"})
    console.log(err);
   }  
}


exports.resetPassword = async function(req,res,next){
  try{
  let UUID = req.params.uuid;
  let data = await ForgotPasswordDB.findOne({where : { id:UUID }});
  console.log("is Active ",data.isActive!=false);
  if(data.isActive!=false){
   await data.update({isActive:true});
   res.setHeader('Content-Security-Policy', "script-src 'self' https://cdn.jsdelivr.net");
    res.sendFile( path.join(__dirname,'..','views','reset_password.html'));
  }
  else{
    res.status(404).send('<h2>LINK EXPIRED</h2>')
  }
}
catch(err){
  console.log(err)
  res.send('<h1>some error occured</h1>')
}
}


exports.ResetOldPassword = async function (req,res,next){
  try{
   const t = await sequelize.transaction();
  console.log(req.body);
  let UserEmail = req.body.UserEmail;
  let newPassword = req.body.newPassword;
  let MYUUID = req.body.UUID;

let user = await Users.findOne({where : {Email : UserEmail}});
if(user){
   let uuid = await ForgotPasswordDB.findOne({where : {id:MYUUID}});
   if(uuid){
     console.log(uuid);
      await uuid.update({isActive : false},{transaction : t})
      let saltRounds = 10;
      bcrypt.hash(newPassword,saltRounds,async(err,hash)=>{
        if(err){
          console.log(err);
        }
        else{
          user.update( {Password : hash },{transaction:t})
          .then(async()=>{
           await t.commit()
            return res.status(200).json({message : "PASSWORD CHANGED"})
           })
           .catch(async(err)=>{
            await t.rollback();
             console.log(err);
            return res.status(404).json({message : "ERROR OCCURED"});
           })
         }
       })
     }
   else{
   return res.status(400).json({message : "WRONG UUID"})
   }
} else{
   return res.status(404).json({message : "USER NOT FOUND"});
   }
  }
  catch(err){
    console.log(err);
  }
}
