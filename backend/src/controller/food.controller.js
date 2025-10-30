const foodModel = require('../models/foodItem.modle');
const storageService = require('../Service/Storage.service');
const { v4: uuid } = require('uuid');

async function createFood(req, res) {
    try {
        console.log("Request Body:", req.body);
        console.log("File Info:", req.file);

        // Upload file
        const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid());
        console.log("Upload Result:", fileUploadResult);

        // Create food item in DB
        const foodItem = await foodModel.create({
            name: req.body.name,
            description: req.body.description,
            video: fileUploadResult,
            foodPartner: req.foodPartner._id
        });

        res.status(201).json({
            message: "Food created successfully",
            food: foodItem
        });
    } catch (error) {
        console.error("Error creating food:", error);
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
}


async function getAllFood(req,res) {
    const foods = await foodModel.find()
    res.status(200).json({
        message:"Foods fetched successfully",
        foods
    })
}

module.exports = {
    createFood,
    getAllFood,
};
