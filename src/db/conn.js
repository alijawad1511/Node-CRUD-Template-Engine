const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/userRegistration').then(() => {
    console.log('Connected Successfully...');
}).catch((e) => {
    console.log("Error : ", e);
});