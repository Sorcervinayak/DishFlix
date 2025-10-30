// controllers/foodPartnerProfile.controller.js
const foodPartnerModel = require('../models/foodPartner.modle');

async function getFoodPartnerProfile(req, res) {
   const { id } = req.params
    try {
        const foodPartner = await foodPartnerModel.findById(id)
        if (!foodPartner) {
            return res.status(404).json({ message: 'Food Partner not found' });
        }
        res.status(200).json({ foodPartner });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }       
}

module.exports = {
    getFoodPartnerProfile
}