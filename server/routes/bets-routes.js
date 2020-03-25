const express = require('express');
const router = express.Router();
const bets_controller = require('../controllers/bets-controller');
const { authorize } = require('../util/authorize');

// Routes for /bets/...

router.post('/addBet', authorize({ is_admin: 'false' }), bets_controller.addBet);
router.post('/deleteBet', authorize({ is_admin: 'false' }), bets_controller.deleteBet);
router.post('/updateBet', authorize({ is_admin: 'false' }), bets_controller.updateBet);
router.post('/deleteAll', authorize({ is_admin: 'false' }));
router.get('/getBet', bets_controller.getBet);
router.get('/getAll', bets_controller.getAll);

module.exports = router;