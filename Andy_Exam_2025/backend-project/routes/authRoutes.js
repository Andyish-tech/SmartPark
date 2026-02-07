const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/check-auth', authController.checkAuth);
router.get('/recovery-question/:username', authController.getSecurityQuestion);
router.post('/reset-password', authController.resetPassword);

module.exports = router;
