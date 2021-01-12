const express = require('express');
const { requireSignIn, adminMiddleware }=require('../common-middleware');
const { createUser, updateUser, createCompany, updateCompany }=require('../controller/admin');
const router = express.Router();

// Create New User Route
router.post('/create-user', requireSignIn, adminMiddleware, createUser);

// Create New User Route
router.put('/update-user/:id', requireSignIn, adminMiddleware, updateUser);

// Create New User Route
router.post('/create-company', requireSignIn, adminMiddleware, createCompany);

// Create New User Route
router.put('/update-company/:id', requireSignIn, adminMiddleware, updateCompany);

module.exports = router;