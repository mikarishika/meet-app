import mongoose from 'mongoose';
import { ENV } from './env.js';


export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(ENV.DB_URL, {
            serverSelectionTimeoutMS: 3000,
        })
        console.log('✅connected to MongoDB :', conn.connection.host)
        console.log("DB_URL:", ENV.DB_URL);
    } catch (error) {
        console.error('❌Error while connecting to MongoDB', error)
        setTimeout(() => {connectDB();}, 1000);
    }
}
