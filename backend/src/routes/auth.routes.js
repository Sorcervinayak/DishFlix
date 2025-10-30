const express = require('express');
const authController = require('../controller/auth.controller');

const router = express.Router();

// User auth APIs
router.post('/user/register', authController.registerUser);
router.post('/user/login', authController.loginUser);
router.post('/user/logout', authController.logoutUser);

// Food partner auth APIs
router.post('/food-partner/register', authController.registerFoodPartner);
router.post('/food-partner/login', authController.loginFoddPartner);
router.post('/food-partner/logout', authController.logoutFoodPartner);

module.exports = router;
