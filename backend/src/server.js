import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import chatRoutes from './routes/chat.route.js';
import { ENV } from './lib/env.js';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser'
dotenv.config();

const app = express();
const __direname = path.resolve();
const PORT = ENV.PORT

app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://meet-app-et8n.vercel.app"
  ],
  credentials: true
}));


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => { console.log(`server is running on Port ${PORT}`) })
  } catch (error) {
    console.error(`❌server starting failed ${error}`)
  }
}

startServer()
