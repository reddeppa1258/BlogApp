import User from "../model/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generatetoken = (user)=>{
    return jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET_KEY,{
        expiresIn:'2d'
    })
}


export const register = async(req,res,next)=>{

    const { email,password,name,phone,role} = req.body;
    console.log(email,password,name,phone,role);
    try {
        // checking user is existing or not 
        let user = await User.findOne({email:email});
        if(user){
          return   res.status(400).json({sucess:false,message:"user already exist"})
        }

        //password hassing

        const salt = await bcrypt.genSalt(10);
        const passwordhash = await bcrypt.hash(password,salt);
        user = new User({
            email,
            password:passwordhash,
            name,
            phone,
            role
        }) 
        await user.save();
        return res.status(200).json({success:true,message:"user saved sucessfully"})
        
    } catch (error) {
        res.status(404).json({success:false,message:"internal server error"})
    }
}

export const login = async(req,res,next)=>{
    const { email} =req.body;

    try {
        let user = await User.findOne({email:email})
        if(!user){
            return res.status(404).json({success:false,message:"user not found"})
        }
       const  ispasswordmatch = await bcrypt.compare(req.body.password,user.password);
       if(!ispasswordmatch){
         res.status(401).json({success:false,message:'password not match'})
       }
       const token = generatetoken(user);
       const { password, role, ...rest} = user;
       res.status(200).json({success:true,message:"login successfully",token,data:{ ...rest},role})
    } catch (error) {
         res.status(500).json({success:false,message:'internal server error'})
        
    }
}

