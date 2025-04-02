import mongoose, { Schema } from "mongoose"

const messageSchema = new Schema(
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        receiver: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        chatId: {
            type: Schema.Types.ObjectId,
            ref: 'Chat',
            required: true
        },
        content: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ['sent', 'delivered', 'seen'],
            default: 'sent'
        }
    },
    {
        timestamps: true
    }
)

export const Message = mongoose.model("Message", messageSchema)