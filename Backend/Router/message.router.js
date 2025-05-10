import {Router} from "express"
import { verifyjwt } from "../Middleware/auth.middleware.js"
import { fetchMessage } from "../Controller/message.Controller.js"

const router = Router()

router.post("/fetchMessage",verifyjwt,fetchMessage)

export default router;