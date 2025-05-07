import { Message } from '../Models/message.Model.js';


const userSocketMap = new Map();
    
export const socketController = (io) => {
    io.on("connection", (socket) => {
        console.log(`New Socket Connected: ${socket.id}`);

        socket.on("setup", (userID) => {
            userSocketMap.set(userID, socket.id);
            console.log(`User ${userID} mapped to socket ID: ${socket.id}`);
            console.log("Current users in map:", Array.from(userSocketMap.entries()));
        });
        

        socket.on("joinChat", (roomId) => {
            socket.join(roomId);
        });

        socket.on("sendMessage", async (data) => {
            try {
                const { senderId, receiverId, content } = data;
        
                if (!senderId || !receiverId || !content) {
                    console.log("Missing data in sendMessage event");
                    return;
                }
        
                // Save message to DB
                const message = await Message.create({
                    sender: senderId,
                    receiver: receiverId,
                    content
                });
        
                // Emit the message back to the sender only
                socket.emit("messageSent", {
                    messageID: message._id,
                    content,
                    senderId,
                    receiverId,
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
