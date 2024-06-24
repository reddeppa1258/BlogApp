import Blog from '../model/BlogSchema.js';
import User from "../model/userSchema.js";

export const createnewblog = async(req,res,next)=>{
    const {title,content,topic} = req.body;

    const userId = req.userId;
    const user = await User.findById(userId);
    if(!user){
        return res.status(404).json({success:false,message:"user not found"})
    }
    try {
        const blog = new Blog({
            title,content,topic,
            user:{
                id:userId,
                name:user.name
            }
        })
        await blog.save();
        res.status(200).json({success:true,message:"blog saved successfully"})
    } catch (error) {
        return res.status(500).json({success:false,message:"internal server error"})
    }
}

export const getallblogs = async(req,res,next)=>{

    try {
         
       const blog = await Blog.find();
       res.status(200).json({success:true,message:"blogs found",blog
       })
    } catch (error) {
        return res.status(401).json({success:false,messsage:"internal server error"})
        
    }
}

export const getsingleblog = async(req,res,next)=>{
    const blogId = req.params.id

    try {
       
         const blog = await Blog.findById(blogId);

         if(!blog){
            return res.status(404).json({success:false,message:'blog not found'})
        }
      
        res.status(200).json({success:true,message:"single blog found",data:blog})
    } catch (error) {
            return res.status(401).json({success:false,message:'internal server error'})
            
    }
}


export const deleteblog = async(req,res,next)=>{

    const blogId = req.params.id;
    const userId = req.userId;

    try {
        const blog = await  Blog.findById(blogId);
        if(!blog){
            return res.status(404).json({success:true,message:"no blog found"})
        } 
        
        if(blog.user.id.toString()!==userId.toString()){
            return res.status(401).json({success:false,message:"unauthorizes, you cannot delete the blog"})
        }
        await Blog.findByIdAndDelete(blogId);
        res.status(200).json({success:true,message:"delete the blog successfully"})


    } catch (error) {
        res.status(500).json({success:false,message:"internal server error"})
    }
}

// export const updateblog = async(req,res,next)=>{
//     const blogId = req.params.id;
//     const userId = req.userId;
//     console.log(blogId);
//     console.log(userId);

//     try {
//         const blog = await Blog.findById(blogId)
//         console.log(blog)
//         if(!blog){
//             return res.status(404).json({success:false,message:'blog not found'})
//         }
//       if(blog.user.id.toString() !== userId.toString()){
//         return res.status(401).json({success:false,message:"user not found"})
//       }
//     const updateblog=  await Blog.findByIdAndUpdate(blogId,{$set:req.body},{new:true})
//       res.status(200).json({success:true,message:"blog updated"})
//     } catch (error) {
//         res.status(500).json({success:false,message:'internal server'})
//     }
// }

export const updateblog = async(req,res,next)=>{

    const blogId = req.params.id;
    const userId = req.userId;

    try {
        const blog = await  Blog.findById(blogId);
        if(!blog){
            return res.status(404).json({success:false,message:"no blog found"})
        } 
        
        if(blog.user.id.toString()!==userId.toString()){
            return res.status(401).json({success:false,message:"unauthorizes, you cannot update the blog"})
        }
        await Blog.findByIdAndUpdate(blogId,{$set:req.body},{new:true});
        res.status(200).json({success:true,message:"update the blog successfully"})


    } catch (error) {
        res.status(500).json({success:false,message:"internal server error"})
    }
}

export const getblogbytopic = async(req,res,next)=>{
    const topic = req.params.topic;
    try {
        const blog = await Blog.find({topic:new RegExp(topic,"i")})
        if(!blog || blog.length===0){
            return res.status(404).json({success:false,message:"blogs not found"})
        }
        res.status(200).json({success:true,message:"blogs found",data:blog})
    } catch (error) {
        res.status(500).json({success:false,message:'internal server error'})
    }
}
