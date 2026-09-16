import axios from "axios";


const api = axios.create({
    // baseURL:'http://localhost:5173/',
    baseURL: 'https://url-short-server.onrender.com/',
});


export default api;