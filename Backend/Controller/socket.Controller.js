import { Message } from '../Models/message.Model.js';
import { Chat } from '../Models/chat.Model.js';
import {User} from "../Models/user.Model.js"

const userSocketMap = new Map();
    
export const socketController = (io) => {
    io.on("connection", (socket) => {
        console.log(`New Socket Connected: ${socket.id}`);

        socket.on("setup", (username) => {
            userSocketMap.set(username, socket.id);
            console.log(`User ${username} mapped to socket ID: ${socket.id}`);
            console.log("Current users in map:", Array.from(userSocketMap.entries()));
        });
        

        socket.on("joinChat", (roomId) => {
            socket.join(roomId);
        });

        // socket.on("sendMessage", async (data) => {
        //     try {
        //         const { senderId, reciverId, content } = data;

        //         let chat = await Chat.findOne({
        //             isGroupChat: false,
        //             participants: { $all: [senderId, reciverId], $size: 2 }
        //         });

        //         if (!chat) {
        //             chat = await Chat.create({
        //                 participants: [senderId, reciverId],
        //                 isGroupChat: false
        //             });
        //         }

        //         const chatId = chat._id;

        //         const message = await Message.create({
        //             sender: senderId,
        //             receiver: reciverId,
        //             content,
        //             chatId
        //         });

        //         chat.lastMessage = message._id;
        //         await chat.save();

        //         io.to(chatId.toString()).emit("messageSent", {
        //             messageID: message._id,
        //             content,
        //             senderId,
        //             reciverId,
        //             chatId,
        //             timestamp: message.createdAt
        //         });
        //     } catch (err) {
        //         console.error("sendMessage error:", err.message);
        //     }
        // });

        socket.on("sendMessage", async (data) => {
            try {
                console.log("something is there");
                const { senderUsername, receiverUsername, content } = data;
    
                // Get the userIds by username (this requires your User model)
                const sender = await User.findOne({ username: senderUsername });
                const receiver = await User.findOne({ username: receiverUsername });
    
                if (!sender || !receiver) {
                    console.log('Sender or Receiver not found');
                    return;
                }
    
                const senderId = sender._id;
                const receiverId = receiver._id;
    
                // Find or create the chat between the users
                let chat = await Chat.findOne({
                    isGroupChat: false,
                    participants: { $all: [senderId, receiverId], $size: 2 }
                });
    
                if (!chat) {
                    chat = await Chat.create({
                        participants: [senderId, receiverId],
                        isGroupChat: false
                    });
                }
    
                const chatId = chat._id;
    
                // Create the new message
                const message = await Message.create({
                    sender: senderId,
                    receiver: receiverId,
                    content,
                    chatId
                });
    
                // Update the last message on the chat
                chat.lastMessage = message._id;
                await chat.save();
    
                // Get the receiver's socket ID from the userSocketMap
                const receiverSocketId = userSocketMap.get(receiverUsername);
    
                if (!receiverSocketId) {
                    console.log(`Receiver ${receiverUsername} is not online`);
                    return;
                }
    
                // Emit the message to the receiver
                io.to(receiverSocketId).emit("messageSent", {
                    messageID: message._id,
                    content,
                    senderUsername,
                    receiverUsername,
                    chatId,
                    timestamp: message.createdAt
                });
            } catch (err) {
                console.error("sendMessage error:", err.message);
            }
        });
        socket.on("fetchMessages", async ({ chatId }, callback) => {
            try {
                const messages = await Message.find({ chatId }).sort({ createdAt: 1 });
                callback(messages);
            } catch (err) {
                console.error("fetchMessages error:", err.message);
                callback([]);
            }
        });

        socket.on("disconnect", () => {
            console.log(`Socket Disconnected: ${socket.id}`);
        });
    });
};
