import { Message } from "../Models/message.Model.js"
import {asyncHandler} from "../Util/asyncHandler.js"
import mongoose from 'mongoose'


const fetchMessage = asyncHandler(async (req, res) => {
    
    const userId = new mongoose.Types.ObjectId(req.user._id)
    const {receiverId} = new mongoose.Types.ObjectId(req.body.id)
    
    const messages = await Message.find({
        $or: [
            { sender: userId, receiver: receiverId },
            { sender: receiverId, receiver: userId }
        ]
    }).sort({ createdAt: 1 })

    res.status(200).json(messages)
})

export {fetchMessage}
