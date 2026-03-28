import axios from 'axios';

const API = axios.create({
    baseURL: "http://localhost:5000/api"
});

API.interceptors.request.use((req) =>{
    
    try{
        
    const token = localStorage.getItem('token');

    if(token){
        req.headers.Authorization = `Bearer ${token}`
    }
    
    return req;

    }catch(error){
        return Promise.reject(error);
    }
});

export default API;
