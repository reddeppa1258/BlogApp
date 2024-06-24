import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoute from "./Routes/auth.js"
import userRoute from "./Routes/user.js"
import blogRoute  from "./Routes/blog.js"



dotenv.config();
const app=express();
const port =process.env.PORT  || 5000;

mongoose.set("strictQuery",false)

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO)
        console.log("DB connection success")
    } catch (error) {
        console.log("DB connection error")
    }
}
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth",authRoute);
app.use("/api/v1/user",userRoute);
app.use("/api/v1/blog",blogRoute)


connectDB().then(()=>{
    app.listen(port,()=>{
        console.log("server is listening")
    })
}).catch((error)=>{console.log(error)})



//import crypto from 'crypto';

//const randomHex = crypto.randomBytes(32).toString('hex');
//console.log(randomHex);
