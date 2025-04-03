import {asyncHandler} from "../Util/asyncHandler.js"
import {User} from "../Models/user.Model.js"
import fileUpload from "../Util/cloudinary.js"


const registerUser=asyncHandler(async (req,res) => {
    const {username,email,password}=req.body

    if ([username,email,password].some((x)=>x?.trim()==="")) {
        throw new Error("All fields are required ")
    }

    const existUser=await User.findOne({
        $or:[{username},{email}]
    })
    
    if(existUser){
        throw new Error("User Already exist")
    }

    const pfpPath=req.files?.avatar?.path
    if(!pfpPath){
        throw new Error("Path Don't exist ")
    }
    const pfpLink=await fileUpload(pfpPath)
    const user=await User.create({
        username,
        email,
        password,
        pfp:pfpLink||""
    })

    return res.status(201).json({
        message:"User created Successfully"
    })
})

const loginUser=asyncHandler(async (req,res) => {
    const{username,password}=req.body
    if ([username,password].some((x)=>x?.trim()==="")) {
        throw new Error("All fields are required ")
    }
    const existUser=User.findOne({
        $or:{username}
    })
    if(!existUser){
        throw new Error("No User Exist")
    }
})

export {
    registerUser
}