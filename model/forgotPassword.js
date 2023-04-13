const Sequelize = require('sequelize');
const sequelize = require('../utils/database');


const ForgotPasswordDB = sequelize.define('forgotpassword',{
    id :{
        type : Sequelize.UUID,
        allowNull : false,
        primaryKey : true
    },
    isActive : Sequelize.BOOLEAN,
    expiresby: Sequelize.DATE
})



module.exports = ForgotPasswordDB;