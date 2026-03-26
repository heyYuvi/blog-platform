import { useState } from "react";
import API from "../API/axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () =>{

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    function handleChange(e){
        setForm({...form, [e.target.name]: e.target.value});
    }

    async function handleSubmit (e){
        e.preventDefault();
        try{
            
         await API.post('/register', form);
         alert("User Registered");
        
        setForm({
            name: "",
            email: "",
            password: ""
        });

        navigate('/login');
        }catch(error){
            console.error (error.response?.data?.message || "Register Error");
        }
    }

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="w-96 shadow-lg bg-white p-6">
                <h1 className="font-bold text-xl text-center mb-6">Register</h1>
                <input type="text" value={form.name} name="name" placeholder="Name" onChange={handleChange} className="border p-3 rounded-lg w-full mb-4 focus:outline-0 focus:ring-2 focus:ring-blue-500"></input>
                <input type="text" value={form.email} name="email" placeholder="Email" onChange={handleChange} className="border p-3 rounded-lg w-full mb-4 focus:outline-0 focus:ring-2 focus:ring-blue-500"></input>
                <input type="text" value={form.password} name="password" placeholder="Password" onChange={handleChange} className="border p-3 rounded-lg w-full mb-6 focus:outline-0 focus:ring-2 focus:ring-blue-500"></input>
                <button type="submit" className="border p-3 rounded-lg w-full bg-blue-400 font-bold text-white cursor-pointer hover:bg-blue-500 transition">Submit</button>
                <p className="text-center mt-4 text-gray-500 text-sm">Already have an account?<Link to="/" className="hover:underline text-blue-500 ml-1">Login</Link></p>
            </form>
        </div>
    )
}

export default Register;