const express = require('express');
const router = express.Router();
const blay_controller = require('../controllers/blay-controller');
const { authorize } = require('../util/authorize');

// Routes for /blay/...

router.post('/addBet', authorize({ is_admin: 'false' }), blay_controller.addBet);
router.post('/deleteBet', authorize({ is_admin: 'false' }), blay_controller.deleteBet);
router.post('/updateBet', authorize({ is_admin: 'false' }), blay_controller.updateBet);
router.post('/deleteAll', authorize({ is_admin: 'false' }));
router.get('/getBet', blay_controller.getBet);
router.get('/getAll', blay_controller.getAll);

module.exports = router;
