import express from "express";
import path from "path";
import  {serve} from "inngest";

import cors from "cors";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { functions, inngest } from "./lib/inngest.js";
const app=express();
const __dirname = path.resolve();

app.use("/api/inngest",serve({client:inngest, functions}));

//middleware
app.use(express.json());
app.use(cors({origin:ENV_CLIENT_URL,credentials:true}));

app.get("/home",(req,res)=>{
    res.send("working properly fine?")
})
// deployment ready
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}


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