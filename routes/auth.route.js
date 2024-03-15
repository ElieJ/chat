const express = require('express');
const { registerUser, signInUser} = require('../controllers/auth.controller');
const router = express.Router();

// Registration route
router.post('/sign-up', registerUser);

// Signin route
router.post('/sign-in', signInUser);

module.exports = router;