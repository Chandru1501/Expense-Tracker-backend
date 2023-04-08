const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');


router.post('/add-user',userController.addUser);

router.get('/get-user/:Email',userController.getUser);

router.post('/login',userController.Login);

router.post('/add-expense',userController.addExpense);

router.get('/get-expenses',userController.getExpenses);

router.post('/delete-expense/:expenseId',userController.deleteExpense);

module.exports = router;