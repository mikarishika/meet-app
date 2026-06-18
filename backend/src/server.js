import express from 'express';
import dotenv from 'dotenv';
import { ENV } from './lib/env.js';

const app = express();
dotenv.config();

app.listen(ENV.PORT, () => {
  console.log("Server is running on port",ENV.PORT);
});

