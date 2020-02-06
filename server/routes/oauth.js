const express =require('express');
const router = express.Router();
const login_controller = require('../controllers/login-controller');

// Oauth authentication
router.get('/redirect', login_controller.get_url_gauth);

// Oauth redirect from google
router.get('/', login_controller.get_user_details);

module.exports = router;
