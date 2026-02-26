import { chatClient, streamClient } from '../lib/stream.js';
import  Session  from '../models/Session.js';
import { v4 as uuidv4 } from 'uuid';

export async function createSession(req,res){
    try{
        const {problem,difficulty}=req.body;
        const userId=req.user._id;
        const clerkId=req.user.clerkId;

        if(!problem || !difficulty){
            return res.status(404).json({message:"Problem and difficulty are required"});
        }

        //generate a unique call id
        const callId=uuidv4(); 

        //create session in db
        const session=await Session.create({problem,difficulty,host:userId,callId});

        //create stream video call
        await streamClient.video.call("default",callId).getOrCreate({
            data:{
                created_by_id:clerkId,
                custom: {problem,difficulty,sessionId:session._id.toString()},
            },
        });

        //chat messaging
        chatClient.channel("messaging",callId,{
            name:`${problem} Session`,
            created_by_id:clerkId,
            members:[clerkId]
        });

        await channel.create();

        res.status(201).json({session});
    }
    catch(error){
        console.log("Error in createSession controller", error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export async function getActiveSessions(_req,res){
    try{
        const sessions=await Session.find({status:"active"}).populate("host","name profileImage email clerkId")
        .sort({createdAt:-1})
        .limit(25);

        res.status(200).json({sessions});
    }
    catch(error){
        console.log("Error in getActiveSession controller",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export async function getRecentSessions(req,res){
    try{
        const userId=req.user._id;

        // host and participant both can see
        const sessions=await Session.find({
            status:"completed",
            $or:[{host:userId},{participant:userId}],
        })
        .sort({createdAt: -1})
        .limit(25);

        res.status(200).json({sessions});
    }
    catch(error){
        console.log("Error in getting recent sessions",error.message);
        res.status(500).json({message:"Internal Server Error!"});
    }
}

export async function getSessionById(req,res){
    try{
        const {id}=req.params;
        
        const session=await Session.findById(id).populate("host","name email profileImage clerkId").populate("participant","name email profileImage clerkId");

        if(!session){
            return res.status(404).json({message:"Session not found"});
        }

        res.status(200).json({session});
    }
    catch(error){
        console.log("Error in getSessionId Controller",error.message);
        res.status(500).json({message : "Internal Server Error!"});
    }
}

export async function joinSession(req,res){
    try{
        const {id}=req.params;
        const userId=req.user._id;
        const clerkId=req.user.clerkId;

        const session=await Session.findById(id);

        if(!session){
            return res.status(404).json({message:"Session not found!"});
        }

        if(session.status !== "active"){
            return res.status(404).json({message:"Cannot join Completed Session!"});
        }

        //host and participant can't be same
        if(session.host.toString()===userId.toString()){
            return res.status(400).json({message:"Host and participant cannot be same."});
        }

        if(session.participant){
            return res.status(409).json({message:"Session is full!"});
        }

        session.participant=userId;
        await session.save();

        const channel=chatClient.channel("messaging",session.callId);
        await channel.addMembers([clerkId]);
        
        res.status(200).json({session});
    }
    catch(error){
        console.log("Error in joinSession Controller ", error.message);
        res.status(500).json({message:"Internal Server Error!"})
    }
}

export async function endSession(req,res){
    try{
        const {id}=req.params; 
        const userId=req.user._id;

        const session=await Session.findById(id);
        if(!session){
            return res.status(404).json({message:"Session not found!"});
        }

        // only host can end the session
        if(session.host.toString() !== userId.toString()){
            return res.status(403).json({message:"Only host can end the session"});
        }

        // check if session in already completed
        if(session.status === "completed"){
            return res.status(400).json({message:"Session is already completed."});
        }

        //deleting stream video call
        const call=streamClient.video.call("default",session.callId);
        await call.delete({hard:true});

        //deleting chat channel
        const channel=chatClient.channel("messaging",session.callId);
        await channel.delete();

        session.status="completed";
        await session.save();
        
        res.status(200).json({message:"Session ended Successfully!"})
    }
    catch(error){
        console.log("Error in endSession controller",error.message);
        res.status(500).json({message:"Internal Server Error!"})
    }
}
