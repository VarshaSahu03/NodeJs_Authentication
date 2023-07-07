const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    //email is unique for specific user
    email:{
        type:String,
        required:true,
        unique:true

    },
    password:{
        type:String,
        required:true,

    },
    name:{
        type:String,
        required:true
    }
},{
    timestamps:true
});
const User = mongoose.model('User',userSchema);
module.export=User;