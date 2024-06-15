const express = require('express');
const isLoggedIn  = require('../utils/isLoggedIn').isLoggedIn;
const router = express.Router();

router.get('/',isLoggedIn,(req,res)=>{
    res.send('This is products page');
});

module.exports = router;