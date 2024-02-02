const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

const connectDatabase = ()=>{
    mongoose.connect(process.env.URI)
    .then(()=>console.log(`Database connected`))
    .catch((err)=> console.log(err));
};

module.exports = connectDatabase;