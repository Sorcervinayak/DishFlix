const express = require('express')
const foodController = require('../controller/food.controller')
const authMiddleware = require('../Middlewares/auth.middleware')
const multer = require('multer')
const router = express.Router()


const upload = multer({
    storage:multer.memoryStorage(),
})

router.post('/',authMiddleware.authenticatePartner,upload.single("video"),foodController.createFood)

router.get('/',authMiddleware.authUserMiddleware,foodController.getAllFood)

module.exports = router