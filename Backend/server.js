import Express from "express"
import mongoose from "mongoose";
import cors from "cors"
import cookieParser from "cookie-parser"

const app=Express()
const PORT=process.env.PORT||8000
import dotenv from "dotenv";
dotenv.config();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true

}))

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
app.use("/user",UserRouter)

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
    app.listen(PORT,()=>{
        console.log("Server is running on",PORT);})  
}).catch((error)=>{
    console.log("Error",error);
})