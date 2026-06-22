import express from 'express';
import dotenv from 'dotenv';


dotenv.config({ quiet: true })

export const ENV = {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    NODE_ENV: process.env.NODE_ENV,
    CLIENT_URL:process.env.CLIENT_URL,
    JWT_SECRET_KEY:process.env.JWT_SECRET_KEY,
    STEAM_API_KEY:process.env.STEAM_API_KEY,
    STEAM_API_SECRET:process.env.STEAM_API_SECRET
}