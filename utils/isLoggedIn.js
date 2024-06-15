const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

module.exports.isLoggedIn = async (req,res,next) => {
    if(!req.cookies.auth) {
        req.flash('error','You need to login first');
        return res.redirect('/users/login');
    }
    try{
        var decodedUser = jwt.verify(req.cookies.auth, process.env.JWT_KEY);
        let user = await User.findOne({ _id: decodedUser.id });
        if(!user){
            req.flash('error','Invalid Credentials Login Again');
            return res.redirect('/users/login');
        }
        req.user = user;
        next();
    }
    catch(err){
        req.flash('An Error Occured Please Login Again');
        return res.redirect('/users/login');
    }
}