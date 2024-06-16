const express = require('express');
const Product = require('../models/productModel');
const isLoggedIn  = require('../utils/isLoggedIn').isLoggedIn;
const router = express.Router();

router.get('/',isLoggedIn,async (req,res)=>{
    let allProducts = await Product.find({});
    let {name} = req.session.user;
    res.render('homePage',{name,allProducts});
});

module.exports = router;