const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    products:[{
        type:mongoose.Schema.Types.UUID,
        ref:'product'
    }],
    contact:Number,
    profileImg:String
});

const User = mongoose.model('User',userSchema);
module.exports = User;