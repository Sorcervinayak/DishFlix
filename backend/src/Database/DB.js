const mongoose = require('mongoose')

function ConnectionDB(){
    mongoose.connect("mongodb+srv://vinayakshrivas30_db_user:WLQXFopWSEPxK2Ii@cluster0.4dvd8zv.mongodb.net/food-view?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=>{
        console.log("DATABASE connected!!")
    })
    .catch((err)=>{
        console.log("MongoDB connection error:",err)
    })
}

module.exports = ConnectionDB

//WLQXFopWSEPxK2Ii-password
//vinayakshrivas30_db_user 