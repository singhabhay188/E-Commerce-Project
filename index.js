const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

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
