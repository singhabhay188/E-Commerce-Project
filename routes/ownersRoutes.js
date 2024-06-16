const express = require('express');
const router = express.Router();

const upload = require('../config/multer-setup');
const Product = require('../models/productModel');

router.get('/add',(req,res)=>{
    let success = req.flash('success');
    console.log('success',success);
    res.render('addProduct',{success});
});

router.post('/add',upload.single('image'),async (req,res)=>{
    try{
        let {name,price,discount,bgColor,panelColor,textColor} = req.body;
        let image = req.file.buffer;
    
        let nproduct = new Product({
            image,name,price,discount,bgColor,panelColor,textColor
        });

        await nproduct.save();
        req.flash('success','Product added successfully');
        res.redirect('/owner/add');
    }
    catch(e){
        console.log(e);
        res.send('Error');
    }
})

module.exports = router;