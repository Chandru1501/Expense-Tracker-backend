
const Razorpay = require('razorpay');
const User = require('../model/users');
const Order = require('../model/order');
const purchase = require('../routes/purchase');
require('dotenv').config()


exports.generateOrderId = async function(req,res,next){
    console.log(req.user);
    console.log("payment");
    var rzp = new Razorpay({
         key_id: process.env.RAZORPAY_KEY_ID,
         key_secret: process.env.MY_SECRECT_KEY_ID
     })
    
    var options = {
      amount: 50000,  // amount in the smallest currency unit
      currency: "INR",
    };
    rzp.orders.create(options, async function(err, order) {
        try{
            if(err){
                throw new Error(JSON.stringify(err));
            }
          console.log(order);
          let user = await User.findOne({where : {Id : req.user.Id}})
          user.createOrder({orderId : order.id,status:"PENDING"})
              .then(()=>{
                res.status(201).json({order, key_id : rzp.key_id})
              })
        }
        catch(err){
         console.log(err);
         res.status(403).json({ message : "somthing went wrong", error : err})
        }
    });
}


exports.updatePaymentStatus = async function(req,res,next) {
 const userId = req.user.Id;
 const paymentId = req.body.payment_Id;
 const orderId = req.body.order_Id;
 console.log(req.body);
   
 let user = await User.findOne({where : {Id : userId }})
 let promise2 = user.update({isPremiumuser : "true" })
 let order = await Order.findOne({where : {orderId : orderId}})
 let promise1 = order.update({ paymentId : paymentId , status : "SUCCESSFULL" })
    Promise.all([promise1,promise2])
    .then(()=>{
        return res.status(202).json({success : true , message : "transaction successfull"})
    })
     .catch(err=>console.log(err));
   
}


exports.updatefailurestatus = async function(req,res,next){
    let userId = req.user.Id;
    let order_Id = req.body.order_Id;
    let payment_Id = req.body.payment_Id
console.log("failure");
    // let user = User.findOne({where : {Id :userId }})
    let order = await Order.findOne( {where : { orderId: order_Id } });
    order.update({ status : "FAILURE", paymentId : payment_Id })
    .then(()=>{
        res.status(402).json({success : false , message : "payment failed"})
    })
}
