const express = require('express');
const router = express.Router();

//Controller
const {signupController,loginController} = require('../controllers/userController');

//Routes
router.get('/',(req,res)=>{
    res.send(process.env.JWT_KEY);
});

router.post('/signup',signupController);

router.post('/login',loginController)

module.exports = router;