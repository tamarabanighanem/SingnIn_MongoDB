const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 1- Create a new schema 
const userSchema = new Schema({
     
    username:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true
    },
    password:{
        type : String,
        required : true
    },
    token:{
        type: String,
        required : true
    }
    }, {timestamp : true}
    )

// 2- Export the model with the schema
module.exports = mongoose.model('user',userSchema);