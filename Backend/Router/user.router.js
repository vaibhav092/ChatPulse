import {Router} from "express"
import { registerUser,loginUser,RefreshAcesstoken,logoutUser,islogin,userInfo} from "../Controller/user.controller.js"
import { upload } from "../Middleware/multer.middleware.js"
import { verifyjwt } from "../Middleware/auth.middleware.js"
const router = Router()

router.post("/register",upload.fields([
    {
        name:"pfp",
        maxCount:1
    }]
),registerUser)

router.post("/login",loginUser)

router.post("/refresh",RefreshAcesstoken)

router.post("/logout",verifyjwt,logoutUser)

router.get("/islogin",verifyjwt,islogin)

router.post("/getpfp",userInfo)

export default router