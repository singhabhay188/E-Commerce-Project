const mongoose = require('mongoose');

async function connect(){
    await mongoose.connect('mongodb://localhost:27017/ECommerce');
    console.log('connected to db');
}

module.exports = connect;