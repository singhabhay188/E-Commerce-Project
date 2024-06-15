const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser')


let sessionOptions = {secret: process.env.SECRET_KEY,resave: false,saveUninitialized: true}
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(session(sessionOptions));
app.use(flash());
app.use(cookieParser());

app.set('view engine','ejs');
app.set("views", path.join(__dirname, "views"));

//Routes
const ownersRoutes = require('./routes/ownersRoutes');
const productsRoutes = require('./routes/productsRoutes');
const usersRoutes = require('./routes/usersRoutes');

//Db Connection
const connectMongo = require('./controllers/mongooseConnect');
connectMongo();

app.use('/owner',ownersRoutes);
app.use('/products',productsRoutes);
app.use('/users',usersRoutes);

app.get('*',(req,res)=>{
    res.status = 404;
    res.send('Invalid Page');
});

app.listen(3000);
