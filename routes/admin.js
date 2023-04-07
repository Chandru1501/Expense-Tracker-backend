const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');


router.post('/add-user',adminController.addUser);

router.get('/get-user/:Email')

module.exports = router;