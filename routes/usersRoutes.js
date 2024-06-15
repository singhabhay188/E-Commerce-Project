const express = require('express');
const router = express.Router();

//Controller
const {signupController,loginController} = require('../controllers/userController');

//Routes
router.get('/login',(req,res)=>{
    if(req.user) return res.redirect('/products');
    let error = req.flash('error');
    let email = req.flash('email');
    res.render('login',{error,email});
});
router.get('/signup',(req,res)=>{
    if(req.user) return res.redirect('/products');
    let error = req.flash('error');
    res.render('signup',{error});
});
router.get('/logout',(req,res)=>{
    req.user = null;
    res.clearCookie('auth');
    res.redirect('/users/login');
});

router.post('/signup',signupController);

router.post('/login',loginController)

module.exports = router;