const express = require('express');
const { signup, signin } = require('../controller/auth');
const { validateSignupRequest, isRequestValidated, validateSignInRequest }=require('../validator');
const router = express.Router();

// Signup Route
router.post('/signup', validateSignupRequest, isRequestValidated, signup);

// SignIn Route
router.post('/signin', validateSignInRequest, isRequestValidated, signin);

module.exports = router;