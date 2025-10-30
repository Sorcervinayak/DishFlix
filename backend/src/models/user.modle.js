const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    fullname:{
        type : String,
        required: true
    },
    email:{
        type:String,
        unique:true,
        required: true,
    },
    password:{
        type:String,
    },
},{timestamps : true})

const userModle = mongoose.model("User",userSchema)

module.exports = userModle
