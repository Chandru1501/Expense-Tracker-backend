const Users = require('../model/users');
const Sib = require('sib-api-v3-sdk');
require('dotenv').config();

exports.resetPassword = async function (req,res,next){
    console.log("reseting password");
    const email = req.body.Email;
    console.log(req.body);
    Users.findOne({where : {Email : email}})
        .then((email)=>{
            if(email){
               let Email = email.Email;
                console.log(email);
              const client = Sib.ApiClient.instance;
              const apiKey = client.authentications['api-key'];
              apiKey.apiKey = process.env.SEND_IN_BLUE_API
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

              tranEmailApi.sendTransacEmail({
                sender,
                to : receivers,
                subject : "reset password",
                textcontent : "Your ONE TIME PASSWORD for reseting password is 8585",
              })
              .then((response)=>{
                console.log(response);
              })
              .catch((err)=>{
                 res.status(410).json({message : "Email not generated"})
              })
            }
            else{
                console.log("not found");
                res.status(404).json({
                    status : "userNotFound"
                })
            }
        })
        .catch(err=>{
            console.log(err);
        })

}