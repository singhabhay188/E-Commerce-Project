const express = require('express');
const app = express();

//Routes
const ownersRoutes = require('./routes/ownersRoutes');
const productsRoutes = require('./routes/productsRoutes');
const usersRoutes = require('./routes/usersRoutes');

//Db Connection
const connectMongo = require('./controllers/mongooseConnect');
connectMongo();


app.use('/owners',ownersRoutes);
app.use('/products',productsRoutes);
app.use('/users',usersRoutes);

app.get('*',(req,res)=>{
    res.status = 404;
    res.send('Invalid Page');
});

app.listen(3000);
