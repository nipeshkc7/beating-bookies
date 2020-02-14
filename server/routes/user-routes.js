const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user-controller');

// Routes for /user/...

router.post('/login', user_controller.login);
router.post('/register', user_controller.register);
router.post('/delete', user_controller.deleteById);
router.get('/getAll', user_controller.getAll);
router.get('/getUserById', user_controller.getUserById);
router.post('/updateUser', user_controller.update_user);
router.post('/oauth', user_controller.google_login);
router.post('/oauth/redirect', user_controller.get_url_gauth);


module.exports = router;
