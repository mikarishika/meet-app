import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import router from './routes/auth.route.js';
import { ENV } from './lib/env.js';
import { connectDB } from './lib/db.js';
dotenv.config();

const app = express();
const __direname = path.resolve();
const PORT = ENV.PORT

app.use(express.json());
app.use("/api/auth", router);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => { console.log(`server is running on Port ${PORT}`) })
  } catch (error) {
    console.error(`❌server starting failed ${error}`)
  }
}

startServer()