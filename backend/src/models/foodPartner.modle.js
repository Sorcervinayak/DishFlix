const mongoose = require('mongoose')

const foodPartnerSchema = mongoose.Schema({
    name:{
        required:true,
        type:String,
    },
    contactName:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true
    }
})


const foodPartenrModle = mongoose.model("foodpartner",foodPartnerSchema)
module.exports = foodPartenrModle