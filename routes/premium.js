const express = require('express');
const router = express.Router();
const PremiumController = require('../controllers/premium');
const authendication = require('../middleware/authendication');


router.get('/get-leaderboard',authendication.authendicate,PremiumController.getLeaderboard);

router.get('/download',authendication.authendicate,PremiumController.download);

router.get('/getdownloadlinks',authendication.authendicate,PremiumController.getOlderDownloads);


module.exports = router;