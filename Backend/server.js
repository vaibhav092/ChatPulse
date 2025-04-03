import Express from "express"
import mongoose from "mongoose";
const app=Express()
const PORT=process.env.PORT||8000
import dotenv from "dotenv";
dotenv.config();


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