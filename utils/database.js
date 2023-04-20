const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USERNAME,process.env.DB_PW,{
    dialect : "mysql",
    host : process.env.HOST_URL
})


module.exports = sequelize;