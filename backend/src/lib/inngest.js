import {Inngest} from "inngest";
import {connectDB} from "./db.js";
import {User} from "../models/User.js";

export const inngest=new Inngest(
    {id:"sharang-iq"}
);

const syncUser=inngest.createFunction(
    {id:"sync-user"},
    {event:"clerk/User.created"},
    async ({event})=>{
        await connectDB(); 
        const {id,first_name,last_name,image_url,email_addresses}=event.data;
        const newUser={
            clerkId:id,
            email:email_addresses[0]?.email_address,
            name:`${first_name || " "}` `${last_name || ""}`,
            profileImage:image_url
        }
        await User.create(newUser);
    }
)

const deleteUser=inngest.createFunction(
    {id:"delete-user"},
    {event:"clerk/user-deleted"},
    async({event})=>{
        await connectDB();
        
        const {id}=event.data;
        await User.deleteOne({clerkId:id});
    }
)

export const fucntions= [syncUser,deleteUser];