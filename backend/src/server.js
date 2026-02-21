import express from "express";
import path from "path";
import  {serve} from "inngest/express";

import cors from "cors";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { functions, inngest } from "./lib/inngest.js";
const app=express();
const __dirname = path.resolve();

//middleware
app.use(express.json());
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}));

app.use("/api/inngest",serve({client:inngest, functions}));

app.get("/home",(req,res)=>{
    res.send("working properly fine?")
})

//first connecting to db then start listening on the port
const startServer= async()=>{
    await connectDB();
    try {
      app.listen(ENV.PORT,()=>{
      console.log("app is listenning on port",ENV.PORT);
    });
    } catch (error) {
      console.log("error starting the server");
    }
}

startServer();