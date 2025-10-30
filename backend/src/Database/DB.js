const mongoose = require('mongoose')

function ConnectionDB(){
    mongoose.connect("process.env.MONGODB_URL")
    .then(()=>{
        console.log("DATABASE connected!!")
    })
    .catch((err)=>{
        console.log("MongoDB connection error:",err)
    })
}

module.exports = ConnectionDB 
