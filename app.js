const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/user');
const bodyParser = require('body-parser');
const Users = require('./model/users');
const expenses = require('./model/expenses');

app.use(cors());

app.use(bodyParser.json({ extended : false }));

app.use('/user',userRoutes);

Users.sync()
expenses.sync()
// Users.sync({force : true})
// expenses.sync({force : true})
.then((response)=>{
    console.log(response);
    app.listen(8080);
})
.catch(err=>console.log(err));