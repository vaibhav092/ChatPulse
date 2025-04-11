import { Message } from '../Models/message.Model.js';
import { Chat } from '../Models/chat.Model.js';

export const socketController = (io) => {
    io.on("connection", (socket) => {
        console.log(`New Socket Connected: ${socket.id}`);

        socket.on("joinChat", (roomId) => {
            socket.join(roomId);
        });

        socket.on("sendMessage", async (data) => {
            try {
                const { senderId, reciverId, content } = data;

                let chat = await Chat.findOne({
                    isGroupChat: false,
                    participants: { $all: [senderId, reciverId], $size: 2 }
                });

                if (!chat) {
                    chat = await Chat.create({
                        participants: [senderId, reciverId],
                        isGroupChat: false
                    });
                }

                const chatId = chat._id;

                const message = await Message.create({
                    sender: senderId,
                    receiver: reciverId,
                    content,
                    chatId
                });

                chat.lastMessage = message._id;
                await chat.save();

                io.to(chatId.toString()).emit("messageSent", {
                    messageID: message._id,
                    content,
                    senderId,
                    reciverId,
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
