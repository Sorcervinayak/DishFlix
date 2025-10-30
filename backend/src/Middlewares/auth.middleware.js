// // middleware/authMiddleware.js
 const jwt = require('jsonwebtoken');
const userModel = require('../models/user.modle');
const foodPartenrModle = require('../models/foodPartner.modle');

const authenticatePartner = async (req, res, next) => {
    const {token} = req.cookies
    if(!token){
        return res.status(401).json({
            message:"Access denied . No token provided"
        })
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const foodPartner = await foodPartenrModle.findById(decoded.id)

        req.foodPartner = foodPartner
        next()
    }
    catch(error){
        res.status(401).json({
            message:"Invalid token"
        })
    }
};

async function authUserMiddleware(req,res,next) {
    const {token} = req.cookies
    if(!token){
        return res.status(401).json({
            message:"Access denied. No token provided"
        })
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const user = await userModel.findById(decoded.id)
        
        req.user = user
        next()
    }catch(error){
        res.status(401).json({
            message:"Invalid token"
        })
    }
}
 module.exports = {authUserMiddleware ,
    authenticatePartner
  };