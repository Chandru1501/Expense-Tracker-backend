const express = require('express');
const router = express.Router();
const PremiumController = require('../controllers/premium');
const authendication = require('../middleware/authendication');


router.get('/get-leaderboard',authendication.authendicate,PremiumController.getLeaderboard);


module.exports = router;