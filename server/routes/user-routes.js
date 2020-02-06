const express =require('express');
const router = express.Router();
const user_controller = require('../controllers/user-controller');

// Oauth authentication url
// router.get('/oauth/redirect', user_controller.get_url_gauth);

// // Oauth redirect handler
// router.get('/oauth', user_controller.get_user_details);

router.post('/login', user_controller.login);

router.post('/register', user_controller.register);

router.post
module.exports = router;
