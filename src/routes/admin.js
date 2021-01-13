const express = require('express');
const { requireSignIn, adminMiddleware }=require('../common-middleware');
const { createUser, updateUser, createCompany, updateCompany, getSubordinates, searchEmployee }=require('../controller/admin');
const router = express.Router();

// Create New User Route
router.post('/create-user', requireSignIn, adminMiddleware, createUser);

// Update User Route
router.put('/update-user/:id', requireSignIn, adminMiddleware, updateUser);

// Create New Company Route
router.post('/create-company', requireSignIn, adminMiddleware, createCompany);

// Update Company Route
router.put('/update-company/:id', requireSignIn, adminMiddleware, updateCompany);

// Get Subordinates Route
router.get('/get-subordinates/:userId', requireSignIn, adminMiddleware, getSubordinates);

// Search Employees Route
//http://localhost:3000/api/search?type=name&value=Admin
//http://localhost:3000/api/search?type=id&value=2
router.get('/search', requireSignIn, adminMiddleware, searchEmployee);

module.exports = router;