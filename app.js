const express = require('express');
const app = express();
const cors = require('cors');
const adminRoutes = require('./routes/admin');
const bodyParser = require('body-parser');
const Users = require('./model/users');

app.use(cors());

app.use(bodyParser.json({ extended : false }));

app.use('/admin',adminRoutes);
Users.sync()
// Users.sync({force : true})
.then((response)=>{
    console.log(response);
    app.listen(8080);
})
.catch(err=>console.log(err));