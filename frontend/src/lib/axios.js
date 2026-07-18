import axios from "axios";

export const axiosInstance = axios.create({
    // baseURL:'http://localhost:5001/api',
    baseURL: "https://meet-app-vj47.onrender.com/api",
    withCredentials:true,
})
