import mongoose, { Schema } from "mongoose"

const chatSchema = new Schema(
    {
        participants: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }],
        lastMessage: {
            type: Schema.Types.ObjectId,
            ref: 'Message'
        },
        unreadCount: {
            type: Number,
            default: 0
        },
        isGroupChat: {
            type: Boolean,
            default: false
        },
        groupName: {
            type: String,
            trim: true
        },
        groupImage: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true  
    }
)
chatSchema.pre("save", function (next) {
    if (this.isGroupChat && !this.groupName) {
        next(new Error("Group name is required for group chats"));
    } else {
        next();
    }
});


export const Chat = mongoose.model("Chat", chatSchema)