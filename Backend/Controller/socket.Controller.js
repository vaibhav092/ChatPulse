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
            console.log(`Socket ${socket.id} joined room: ${roomId}`);
        });

        socket.on("sendMessage", async (data) => {
            try {
                const { senderId, receiverId, content } = data;
        
                if (!senderId || !receiverId || !content) {
                    console.log("Missing data in sendMessage event");
                    console.log("senderId:", senderId);
                    console.log("receiverId:", receiverId);
                    console.log("content:", content);
                    return;
                }
        
                // Save message to DB
                const message = await Message.create({
                    sender: senderId,
                    receiver: receiverId,
                    content
                });
                
                const messageData = {
                    content,
                    senderId,
                    receiverId,
                    timestamp: message.createdAt
                };
        
                // Send to receiver if they're online
                const receiverSocketId = userSocketMap.get(receiverId);
                if (receiverSocketId) {
                    io.to(receiverSocketId).emit("receiveMessage", messageData);
                }
                
                // Also send back to sender for confirmation
                socket.emit("receiveMessage", messageData);
        
            } catch (err) {
                console.error("sendMessage error:", err.message);
            }
        });        

        socket.on("fetchMessages", async (chatId, callback) => {
            try {
                // Find messages where the user is either sender or receiver
                const messages = await Message.find({
                    $or: [
                        { sender: chatId, receiver: socket.userId },
                        { sender: socket.userId, receiver: chatId }
                    ]
                }).sort({ createdAt: 1 });
                
                // Format messages to match frontend expectations
                const formattedMessages = messages.map(msg => ({
                    content: msg.content,
                    senderId: msg.sender,
                    receiverId: msg.receiver,
                    timestamp: msg.createdAt
                }));
                
                if (typeof callback === 'function') {
                    callback(formattedMessages);
                }
            } catch (err) {
                console.error("fetchMessages error:", err.message);
                if (typeof callback === 'function') {
                    callback([]);
                }
            }
        });

        socket.on("disconnect", () => {
            // Remove user from userSocketMap when they disconnect
            for (const [userId, socketId] of userSocketMap.entries()) {
                if (socketId === socket.id) {
                    userSocketMap.delete(userId);
                    console.log(`User ${userId} disconnected and removed from map`);
                    break;
                }
            }
            console.log(`Socket Disconnected: ${socket.id}`);
        });
    });
};