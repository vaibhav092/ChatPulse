import {asyncHandler} from "../Util/asyncHandler.js"
import {User} from "../Models/user.Model.js"
import fileUpload from "../Util/cloudinary.js"
import jwt from "jsonwebtoken"

const generateAccessAndRefreshToken=async(userId)=>{
    try {
        const user= await User.findById(userId)
        const accessToken=await user.generateRefreshToken();
        const refreshToken=await user.generateAccessToken();
        user.refreshToken=refreshToken;
        user.save({validateBeforeSave:false});

        return {accessToken,refreshToken};
    } catch (error) {
        throw new ApiError(500,"Error while generating token")
    }
}
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
    const user=await User.findOne({
        $or:[{username}]
    })
    if(!user){
        throw new Error("No User Exist")
    }
    const passwordValid=await existUser.isPasswordCorrect(password)

    if(!passwordValid){
        throw new Error("Password incorrect")
    }
    const {accessToken,refreshToken}=await generateAccessAndRefreshToken(user._id);

    const logedinUser=await User.findById(user._id).select("-password -refreshToken")

    const options={
        httpOnly:true,
        secure:true,}

        return res
        .status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",refreshToken,options)
        .json(new ApiRes(200,{user:logedinUser,accessToken,refreshToken},"Login successfull"))


})

const RefreshAcesstoken=asyncHandler(async (req,res) => {
    const refreshToken=req.cookies.refreshToken;

    if(!refreshToken){
        throw new Error("No refersh token")
    }
    const decoded=jwt.verify(refreshToken, process.env.JWT_SECRET)
    
    if(!decoded){
        throw new Error("refresh Token Error")
    }

    const user = await User.findById(decoded.userId);
    if(!user){
        throw new Error("User not found /TOken mismatch")
    }
    const {accessToken}=await generateAccessAndRefreshToken(user._id);

    const options={
        httpOnly:true,
        secure:true,}

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .json({
        message:"Token refreshed"
    })

})

export {
    registerUser,loginUser,RefreshAcesstoken
}