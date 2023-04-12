const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/user');
const purchaseRoutes = require('./routes/purchase');
const premiumRoutes = require('./routes/premium');

const bodyParser = require('body-parser');
const sequelize = require('./utils/database');
const Users = require('./model/users');
const expenses = require('./model/expenses');
const Order = require('./model/order');
// require('dotenv').config();

app.use(cors());

app.use(bodyParser.json({ extended : false }));

app.use('/user',userRoutes);
app.use('/purchase',purchaseRoutes);
app.use('/premium',premiumRoutes)

Users.hasMany(expenses);
expenses.belongsTo(Users);

Users.hasMany(Order);
Order.belongsTo(Users);


// sequelize.sync({force : true})
sequelize.sync()
.then((response)=>{
    //console.log(response);
    console.log("server running")
    app.listen(8080);
    console.log(process.env.SAMPLE);
})
.catch(err=>console.log(err));