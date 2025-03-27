
# ChatPulse
=======
# ChatPulse

## Overview
ChatPulse is a full‑stack real‑time chat application built using the MERN stack (MongoDB, Express, React, Node.js). It features secure JWT authentication, Socket.IO-powered instant messaging, and a modern, responsive UI. ChatPulse is designed for both one‑to‑one and group chats, making communication seamless and efficient.

## Features
- 🔐 **Authentication & Authorization:** JWT-based authentication with bcrypt for secure password handling.
- 📬 **Real-Time Messaging:** Instant chat functionality via Socket.IO.
- 👥 **Group Chats:** Create, join, and manage group conversations.
- 📷 **Media Sharing:** Send images and other media files securely.
- ✅ **User Status & Typing Indicators:** See when users are online or typing.
- 🔔 **Notifications:** Real-time notifications for new messages and chat updates.
- 🎨 **Responsive UI:** Built with React and Tailwind CSS for a modern look and feel.
- 📊 **Scalability:** Optimized for performance and easy future expansion.

## Tech Stack
- **Frontend:** React, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js, MongoDB, Socket.IO
- **Authentication:** JWT, bcryptjs
- **Storage:** MongoDB Atlas (cloud-based)

## Installation & Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/vaibhav092/mern-chat-app.git
   cd mern-chat-app
   ```
2. **Install dependencies:**
   ```bash
   # Install frontend dependencies
   cd client
   npm install

   # Install backend dependencies
   cd ../server
   npm install
   ```
3. **Configure environment variables:**
   - Create a `.env` file inside the `server/` folder and add:
     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     CLOUDINARY_API_KEY=your_cloudinary_api_key
     # Add other environment variables as needed
     ```
4. **Start the application:**
   ```bash
   # Start backend
   cd server
   npm start

   # Start frontend
   cd ../client
   npm start
   ```
5. **Access ChatPulse:**
   Open your browser and navigate to `http://localhost:3000` to start chatting.

## How to Use
1. **Sign Up/Login:** Create an account using your email and password.
2. **Create or Join Chats:** Initiate one‑to‑one or group conversations.
3. **Send Messages & Media:** Share text, images, and other files in real time.
4. **Receive Notifications:** Get alerted on new messages and chat activities.

## Deployment
- **Frontend:** Deploy to Vercel or Netlify.
- **Backend:** Deploy to Render, Heroku, or AWS.
- **Database:** Use MongoDB Atlas for cloud storage.

## Future Enhancements
- 📞 **Voice & Video Calls** (integrate WebRTC)
- 🛠 **Advanced Profile Customization** (custom avatars, status updates)
- 🌐 **Multi-language Support**
- 📑 **Message Reactions, Edits & Deletions**
>>>>>>> 73538e0 (init)
