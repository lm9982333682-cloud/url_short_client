import axios from "axios";


const api = axios.create({
    // baseURL:'http://localhost:5173/',
    baseURL: 'https://url-short-client-taupe.vercel.app/',
});


export default api;