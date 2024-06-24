import mongoose from "mongoose";

const BlogSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    topic:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,

    },
    user : {
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true,
        },
        name : {
            type:String,
            required:true,
        },
    }
})
export default mongoose.model("Blog",BlogSchema)