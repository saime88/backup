var mongoose = require("mongoose")
var Schema = mongoose.Schema
const admin = new Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    },
    identity:{
        type:String,
        required:true
    }

})

module.exports = User = mongoose.model("user",admin)