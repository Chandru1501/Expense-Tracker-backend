const Sequelize = require('sequelize');
const sequelize = require('../utils/database');


const Order = sequelize.define('order',{
   id : {
    type : Sequelize.INTEGER,
    allowNull : false,
    autoIncrement : true,
    primaryKey : true
   },
   orderId : Sequelize.STRING,
   paymentId : Sequelize.STRING,
   status :Sequelize.STRING
})

module.exports = Order;