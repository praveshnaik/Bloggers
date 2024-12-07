const {login,signup,blog} = require('../controllers/authController');
const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware')

router.post('/sign',signup);
router.post('/login',login);
router.post('/blogs',blog);


module.exports = router;