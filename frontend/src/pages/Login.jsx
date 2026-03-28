import { useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import API from "../API/axios";

const Login = () =>{
    
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) =>{
        setForm({...form, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try{
            const response = await API.post("/login", form);

            const token = response.data.data.token;
            console.log(token);

            localStorage.setItem('token', token);
            
        alert("Login Successful");

        setForm({
            email: "",
            password: ""
        });

        navigate("/");

        }catch(error){
            console.error(error.response?.data?.message || "Login Error");
        }
    }

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="w-96 bg-white rounded-lg shadow-lg p-6">
                <h1 className="font-bold text-xl text-center mb-6">Login</h1>
                <input type="email" value={form.email} name="email" placeholder="Email" onChange={handleChange} className="border p-3 rounded-lg w-full focus:outline-0 focus:ring-2 focus:ring-blue-500 mb-4"></input>
                <input type="password" value={form.password} name="password" placeholder="Password" onChange={handleChange} className="border p-3 rounded-lg w-full focus:outline-0 focus:ring-2 focus:ring-blue-500 mb-6"></input>
                <button type="submit" className="border p-3 rounded-md w-full bg-blue-400 font-bold text-white hover:bg-blue-500 cursor-pointer transition">Submit</button>
                <p  className="text-gray-500 text-center text-sm mt-4">Don't have an account?<Link to="/register" className="ml-1 hover:underline font-semibold text-blue-400">Register</Link></p>
            </form>
        </div>
    )
}

export default Login;