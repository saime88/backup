var mongoose = require("mongoose")
var Schema = mongoose.Schema
const profileSchema = new Schema({
   
    date:{
        type:Date,
        required:true,
        default:Date.now
    },
    extendType:{
        type:String,
        required:true
    },
    extendDecr:{
        type:String,
        required:true
    },
  
    expend:{
        type:Number,
        required:true
    },
    cash:{
        type:Number,
        required:true
    },
    note:{
        type:String
        
    }

})

module.exports = profile= mongoose.model("profiles",profileSchema)