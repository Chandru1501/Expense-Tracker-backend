const Sequelize = require('sequelize');
const sequelize= require('../utils/database');


let downloadData = sequelize.define('download',{
    id : {
        type : Sequelize.INTEGER,
        allowNull : false,
        autoIncrement : true,
        primaryKey : true
    },
    Date : {
        type : Sequelize.STRING,
        allowNull : false
    },
    DataLinks : {
        type : Sequelize.STRING,
        allowNull : false
    }
})

module.exports = downloadData;