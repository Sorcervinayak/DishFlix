const express = require('express')
const router = express.Router()
const foodController = require('../controller/foodPartnerProfile.controller')
const authMiddleware = require('../Middlewares/auth.middleware')


router.get('/:id',authMiddleware.authUserMiddleware,foodController.getFoodPartnerProfile)

module.exports = router 