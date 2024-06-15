const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const generateTokenFromUser = require('../utils/generateTokenFromUser');

module.exports.signupController = async (req,res)=>{
    try{
        let {email,password,name} = req.body;

        if(!email || !password || !name){
            return res.status(400).json({error:'Please fill all fields'});
        }

        let user = await User.findOne({email});
        if(user){
            req.flash('error','User already exists');
            res.redirect('/users/signup');
        }

        bcrypt.hash(password, 10, async function(err, hash) {
            if(err) throw err;
            let nuser = new User({name,email,password:hash});
            await nuser.save();
            var token = generateTokenFromUser(nuser);
            res.cookie('auth',token);
            res.redirect('/products');
        });
    }
    catch(error){
        console.log('Error ',error);
        res.send(error);
    }
}

module.exports.loginController = async (req,res)=>{
    try{
        let {email,password} = req.body;

        //check if user exist or not
        let user = await User.findOne({email});
        if(!user){
            req.flash('error','User not exists with this email.');
            req.flash('email',email);
            return res.redirect('/users/login');
        }

        //check if password is matches or not
        let isMatch = bcrypt.compareSync(password, user.password);
        if(!isMatch){
            req.flash('error','Incorrect Password');
            req.flash('email',email);
            return res.redirect('/users/login');
        }

        //generate token and set cookie
        var token = generateTokenFromUser(user);
        res.cookie('auth',token);
        res.redirect('/products');
    }
    catch(error){
        res.send(error);
    }
}