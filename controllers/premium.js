const User = require('../model/users');
const Expenses = require('../model/expenses');
const sequelize = require('../utils/database');
const Sequelize = require('sequelize');
const fs = require('fs');
const AWS = require('aws-sdk');
const AwsServices = require('../services/AWS');
const download = require('../model/download');


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

exports.download = async function(req,res,next){
    try{
    console.log(req.user);
    let userId = req.user.Id;
    let name =req.user.name;
    let user = await User.findOne({where : { Id : userId }})
    if(user.isPremiumuser=="false"){
        throw new Error();
    }
    else{
    let Expenses = await user.getExpenses();
    let csvArr = [];
    let titles = ",S.NO,Date,income,expense,description,category\n";
    csvArr.push(titles);
    let count=1;
    Expenses.forEach(element => {
      let mydata = `${count},${element.date},${element.income},${element.amount},${element.description},${element.category}\n`;
      csvArr.push(mydata);
      count++;
    });
    count=0;
    console.log(csvArr.join(","));
    let csv = csvArr.join(',');
    let fileURL = await AwsServices.UploadToS3(csv,`${name}${new Date()}.csv`)
    let TodayDate = new Date();
    let day = TodayDate.getDate();
    let month = TodayDate.getMonth() + 1;
    let year = TodayDate.getFullYear();
    user.createDownload({DataLinks : fileURL, Date : `${day}/${month}/${year}`});
    console.log(fileURL);
    res.json(fileURL);
      }
    }
    catch(err){
        res.status(400).json({message : "somthin wrong"});
        console.log(err);
    }
}

exports.getOlderDownloads = async (req,res,next)=>{
try{
  console.log(req.user);
  let myuser = req.user.Id;
  let user = await User.findOne({where : {Id : myuser}});
  console.log(user);
 let downloadData = await user.getDownloads();
//  console.log(downloadData);
 res.status(200).json({success : true , downloadData});
}
catch(err){
  console.log(err);
  res.status(404).json({message : "dont cheat us"});
}
}