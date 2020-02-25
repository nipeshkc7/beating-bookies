const express = require('express');
const router = express.Router();
const d3w_controller = require('../controllers/d3w-controller');
const { authorize } = require('../util/authorize');

// Routes for /d3w/...

router.post('/addBet', authorize({ is_admin: 'false' }), d3w_controller.addBet);
router.post('/deleteBet', authorize({ is_admin: 'false' }), d3w_controller.deleteBet);
router.post('/updateBet', authorize({ is_admin: 'false' }), d3w_controller.updateBet);
router.post('/deleteAll', authorize({ is_admin: 'false' }));
router.get('/getBet', d3w_controller.getBet);
router.get('/getAll', d3w_controller.getAll);

module.exports = router;
