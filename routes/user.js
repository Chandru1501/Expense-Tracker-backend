const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const authendication = require('../middleware/authendication');


router.post('/add-user',userController.addUser);

router.get('/get-user/:Email',userController.getUser);

router.post('/login',userController.Login);

router.post('/add-expense',authendication.authendicate,userController.addExpense);

router.get('/getdetails',authendication.authendicate,userController.getDetails);

router.get('/get-expenses',authendication.authendicate,userController.getExpenses);

router.get('/delete-expense/:expenseId',authendication.authendicate,userController.deleteExpense);


module.exports = router;