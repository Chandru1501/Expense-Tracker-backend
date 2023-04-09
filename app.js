const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/user');
const bodyParser = require('body-parser');
const sequelize = require('./utils/database');
const Users = require('./model/users');
const expenses = require('./model/expenses');

app.use(cors());

app.use(bodyParser.json({ extended : false }));

app.use('/user',userRoutes);

Users.hasMany(expenses);
expenses.belongsTo(Users);

// sequelize.sync({force : true})
sequelize.sync()
.then((response)=>{
    //console.log(response);
    console.log("server running")
    app.listen(8080);
})
.catch(err=>console.log(err));