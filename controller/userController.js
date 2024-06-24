import User from "../model/userSchema.js"

export const getallusers = async(req,res,next)=>{

    try {
        const users = await User.find();
        res.status(200).json({success:true,message:"users found successfully",data:users})
    } catch (error) {
     res.status(404).send({success:false,message:"users not found"})        
    }
}

export const deleteuser= async(req,res,next)=>{
    const userId = req.params.id;
    try {
        if(!userId){
            return res.status(404).json({sucesss:false,message:"user not found"})
        }
        await User.findByIdAndDelete(userId)
        res.status(200).send({success:true,message:"user deleted successfully"})
        
    } catch (error) {
        res.status(500).send({sucsess:false,message:"user not deleted"})
    }
}

export const getsingleuser = async(req,res,next)=>{
    const userId = req.userId
    console.log(userId);
    try {
        const user = await User.findById(userId);
        if(!user){
            res.status(404).json({sucesss:false,message:"user not found"})
        }
        const { password, ...rest} =user._doc;
        res.status(200).send({sucesss:true,messagge:"user found",data:{ ...rest}})
        
    } catch (error) {
        res.status(404).json({sucesss:false,message:"no token "})
    }
}

export const updateuser = async(req,res,nsxt)=>{
    const id = req.params.id;
    try {
        const updateuser = await User.findByIdAndUpdate(id,{$set:req.body},{new:true})
        res.status(200).send({success:true,message:"user has been updated"})
    } catch (error) {
        res.status(500).send({success:false,message:"user not updated"})
        
    }
}