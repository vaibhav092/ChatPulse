import Express from "express"
import mongoose from "mongoose";
import cors from "cors"
import cookieParser from "cookie-parser"
import { createServer } from 'http';
import { Server } from 'socket.io';

const app=Express()
const PORT=process.env.PORT||8000
import dotenv from "dotenv";
dotenv.config();

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173", 
        methods: ["GET", "POST"],
        credentials: true
    }
});

import { socketController } from "./Controller/socket.Controller.js";

socketController(io)

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));


app.use(Express.json({
    limit:"16kb",
}))

app.use(Express.urlencoded({
    extended:true,
    limit:"16kb"
}))

app.use(Express.static("public"))

app.use(cookieParser())
import UserRouter from "./Router/user.router.js"
app.use("/api/user",UserRouter)

import MessageRouter from "./Router/message.router.js"
app.use("/api/message",MessageRouter)

async function connectDb() {
    try {
        const connect =await mongoose.connect(process.env.MONGO_URL,{
            dbName:"ChatPulse",
        })
        console.log("DB connected");
    } catch (error) {
        console.log("DB::ERROR::",error);
        throw error
    }
    
}

connectDb().then(()=>{
    httpServer.listen(PORT,()=>{
        console.log("Server is running on",PORT);})  
}).catch((error)=>{
    console.log("Error",error);
})