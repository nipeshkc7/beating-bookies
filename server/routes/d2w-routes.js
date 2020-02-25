const express = require('express');
const router = express.Router();
const d2w_controller = require('../controllers/d2w-controller');
const { authorize } = require('../util/authorize');

// Routes for /d2w/...

router.post('/addBet', authorize({ is_admin: 'false' }), d2w_controller.addBet);
router.post('/deleteBet', authorize({ is_admin: 'false' }), d2w_controller.deleteBet);
router.post('/updateBet', authorize({ is_admin: 'false' }), d2w_controller.updateBet);
router.post('/deleteAll', authorize({ is_admin: 'false' }));
router.get('/getBet', d2w_controller.getBet);
router.get('/getAll', d2w_controller.getAll);

module.exports = router;
