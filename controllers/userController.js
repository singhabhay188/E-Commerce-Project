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
        if(user) return res.status(401).json({error:'User already exists'});


        bcrypt.hash(password, 10, async function(err, hash) {
            if(err) throw err;
            let nuser = new User({name,email,password:hash});
            await nuser.save();
            var token = generateTokenFromUser(nuser);
            res.cookie('auth',token);
            res.send('Success');
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

        if(!email || !password){
            return res.status(400).json({error:'Please fill all fields'});
        }

        let user = await User.findOne({email});
        if(!user) return res.status(400).json({error:'User not exists with this email Please SignUp First'});

        let isMatch = bcrypt.compareSync(password, user.password);

        if(!isMatch) return res.status(400).json({error:'Invalid Password'});

        var token = generateTokenFromUser(user);
        res.cookie('auth',token);
        res.send('Login Successfully');
    }
    catch(error){
        console.log('Error ',error);
        res.send(error);
    }
}