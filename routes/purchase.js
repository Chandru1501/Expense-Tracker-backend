const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchase');
const userController = require('../controllers/user');
const authendication = require('../middleware/authendication');



router.get('/premiummembership',authendication.authendicate,purchaseController.generateOrderId);

router.post('/updatetransactionstatus',authendication.authendicate,purchaseController.updatePaymentStatus);

router.post('/updatefailurestatus',authendication.authendicate,purchaseController.updatefailurestatus);

module.exports = router;