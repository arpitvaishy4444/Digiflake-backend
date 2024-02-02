const express = require('express');
const dotenv = require("dotenv");
dotenv.config();
const connectDatabase = require("./databasse/connectDatabase");
const userRouter = require("./Routes/UserRouter");
const productRouter = require("./Routes/productRouter");
const cors = require("cors");

connectDatabase();

const app = express();
app.use(cors());



app.use(express.json());
app.use("/api",userRouter);
app.use("/api",productRouter);


app.listen(process.env.PORT,()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`);
});

// Middleware for Error
const ErrorMiddleware = require("./middleware/error.js");
app.use(ErrorMiddleware);

// unHandled Promise rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise rejection`);
    server.close(()=>{
        process.exit(1);
    });

});