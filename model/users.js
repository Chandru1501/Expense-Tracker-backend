const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Users = sequelize.define('users',{
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
    }
})

module.exports = Users;