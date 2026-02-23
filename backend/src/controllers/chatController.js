import { chatClient } from "../lib/stream.js";

export const getStreamToken=(req,res)=>{
    try{
        const token=chatClient.createToken(req.user.clerkId);
        res.status(200).json({
            token,
            userId: req.user.clerkId,
            userName: req.user.name,
            userImage:req.user.image
        })
    }
    catch(error){
        console.log("Error getting token",error.message);
        res.status(500).json({msg:"Internal Server error"});
    }
}
