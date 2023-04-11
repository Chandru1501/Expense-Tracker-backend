const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Users = sequelize.define('users',{
    Id : {
        type : Sequelize.INTEGER,
        allowNull : false,
        autoIncrement : true,
        primaryKey : true
       },
    Username : {
     type : Sequelize.STRING,
     allowNull : false
    },

    Email : {
     type : Sequelize.STRING,
     allowNull : false,
     primaryKey : true
    },

    Password : {
        type : Sequelize.STRING,
        allowNull : false
    },
    isPremiumuser : Sequelize.STRING
})

module.exports = Users;