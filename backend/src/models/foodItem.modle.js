const mongoose = require('mongoose')

const foodSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    video:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    foodPartner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"foodpartner",
    },
    likeCount:{ 
        type:Number,
        default:0,
    }
})

const foodModle = mongoose.model("fooditem",foodSchema)
module.exports = foodModle