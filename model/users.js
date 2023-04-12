const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Users = sequelize.define('users',{
    
        Id : {
            type : Sequelize.INTEGER,
            allowNull : false,
            autoIncrement : true,
            primaryKey : true
           },
    Email : {
     type : Sequelize.STRING,
     allowNull : false,
     primaryKey : true
    },

    Username : {
     type : Sequelize.STRING,
     allowNull : false
    },


    Password : {
        type : Sequelize.STRING,
        allowNull : false
    },
    isPremiumuser : Sequelize.STRING,
    TotalExpense : Sequelize.INTEGER
})

module.exports = Users;