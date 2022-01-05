const mongoose = require('mongoose');

const connectDB = (url) => {
    return mongoose.connect(url).then(() => {
        console.log("success connect to db")
    });
};

module.exports = connectDB;