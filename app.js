const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const userRoutes = require('./routes/user');
const purchaseRoutes = require('./routes/purchase');
const premiumRoutes = require('./routes/premium');
const passwordRoutes = require('./routes/password');
const path= require('path');

const bodyParser = require('body-parser');
const sequelize = require('./utils/database');
const Users = require('./model/users');
const expenses = require('./model/expenses');
const Order = require('./model/order');
const forgetPassword = require('./model/forgotPassword');
const download = require('./model/download');

app.use(express.static(path.join(__dirname,'public')))

const logFiles = fs.createWriteStream(path.join(__dirname,'logFiles'),{flags:"a"}); 

app.use(cors());

app.use(helmet());

app.use(morgan('combined',{stream:logFiles}))

app.use(bodyParser.json({ extended : false }));

app.use('/user',userRoutes);
app.use('/purchase',purchaseRoutes);
app.use('/premium',premiumRoutes);
app.use('/password',passwordRoutes);

Users.hasMany(expenses);
expenses.belongsTo(Users);

Users.hasMany(Order);
Order.belongsTo(Users);

Users.hasMany(forgetPassword);
forgetPassword.belongsTo(Users);

Users.hasMany(download);
download.belongsTo(Users);


// sequelize.sync({force : true})
sequelize.sync()
.then((response)=>{
    //console.log(response);
    console.log("server running")
    app.listen(8080);
})
.catch(err=>console.log(err));