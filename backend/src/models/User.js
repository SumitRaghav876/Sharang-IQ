import mongoose from "mongoose";

const userSchema =new mongoose.Schema
(
    {
        name:{
            type: String,
            required:true
        },
        profileImage:{
            type: String,
            required:true,
            unique:true
        },
        email:{
            type: String,
            required:true,
            unique:true
        },
        clerkId:{
            type: String,
            required:true,
            unique:true
        },
    },{timestamps:true}
);

const User=new mongoose.model("User",userSchema);
export default User;