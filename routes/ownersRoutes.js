const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send('This is owners page');
});

module.exports = router;