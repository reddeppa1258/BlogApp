import jwt from "jsonwebtoken";
import User from "../model/userSchema.js";

export const authnticate =(req,res,next)=>{

    const authtoken= req.headers.authorization;
    console.log(authtoken)
    if(!authtoken || !authtoken.startsWith("Bearer")){
        return res.status(401).json({success:false,message:" no token "})
    }
    try {
        const token = authtoken.split(" ")[1];
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.userId = decoded.id;
        req.role = decoded.role;
        next();
        } catch (error) {
            if(error.name === "token expires"){
                return res.status(401).json({success:false,message:"token expired"})
            }
            return res.status(401).json({success:false,message:'invalid token'})
        
    }
}

export const restrict =(roles)=>async(req,res,next)=>{
    try {
        const userId = req.userId;
        console.log(userId)
        const user =await User.findById(userId)
        if(!user){
            return res.status(404).json({success:false,message:"user not found"})
        }
        const userRole = user.role
        if(userRole==="user" && roles.includes("user")){
            next();
        
        }
        else if(userRole === "admin" && roles.includes("admin")){
            next();
        }
        else{
         return   res.status(401).json({success:false,message:"invalid user"})
        }
    } catch (error) {
        return res.status(500).json({success:false,message:"internal server error"})
    }
}