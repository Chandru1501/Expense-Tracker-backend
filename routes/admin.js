const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');


router.post('/add-user',adminController.addUser);

router.get('/get-user/:Email')

router.post('/login',adminController.Login);

module.exports = router;