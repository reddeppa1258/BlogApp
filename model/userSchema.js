import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    }
}) 
export default mongoose.model("user",userSchema)