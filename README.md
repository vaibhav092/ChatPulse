# ChatPulse

A modern real-time chat application built with the MERN stack and Socket.IO.

## 📹 Demo Video

Check out the application in action:

[Watch the demo video](https://drive.google.com/file/d/1_FaZaW6x7XltqeCrLtVhj96VZ9_myOgA/view?usp=sharing)

## ✨ Features

- **User Authentication**: Secure login and registration
- **Real-time Messaging**: Instant message delivery using Socket.IO
- **Online Status**: See when users are active
- **Message History**: All conversations saved to MongoDB
- **Responsive Design**: Clean UI built with Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Real-time**: Socket.IO
- **Authentication**: JWT with HTTP-only cookies

## 🚀 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/vaibhav092/ChatPulseMe.git
cd ChatPulseMe
```

### 2. Setup Backend
```bash
cd server
npm install
```

Create a `.env` file in the server directory:
```
PORT=8000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

# For image uploads (optional)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Setup Frontend
```bash
cd client
npm install
```

Create a `.env` file in the client directory:
```
VITE_API_BASE_URL=http://localhost:5000/api
```

## ▶️ Running the App

1. Start the backend:
```bash
cd server
npm run dev
```

2. Start the frontend:
```bash
cd client
npm run dev
```

3. Open your browser and visit: `http://localhost:5173`

## 🔌 Socket Events

**Client Events:**
- `setup` - Initialize socket connection
- `join chat` - Enter a chat room
- `typing` - Send typing indicator
- `new message` - Send a message

**Server Events:**
- `user online` - User connection notification
- `message received` - New message notification
- `typing` - Typing indicator

## 📄 License

MIT License

---

Made with ❤️ by [Vaibhav](https://github.com/vaibhav092)
