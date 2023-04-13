const express = require('express');
const router = express.Router();
const passwordController = require('../controllers/password');

router.post('/forgotpassword',passwordController.sendResetmail);

router.get('/resetpassword/:uuid',passwordController.resetPassword);

router.post('/reset-old-password',passwordController.ResetOldPassword);


module.exports = router;