const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    cart:[{
        type:mongoose.Schema.Types.UUID,
        ref:'product'
    }],
    orders:[{
        type:mongoose.Schema.Types.UUID,
        ref:'product'
    }],
    contact:Number,
    profileImg:String
});

const User = mongoose.model('User',userSchema);
module.exports = User;