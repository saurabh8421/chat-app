import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from './components/Input';
import Button from './components/Button';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [showPass, setshowPass] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate(); // Correct way to navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error('Please fill in all fields', { autoClose: 2000 });
    }

    try {
      const response = await axios.post('http://localhost:3000/auth/login', { email, password });

      console.log(response);
      toast.success("Login successful!", { autoClose: 2000 });

      // Store user ID before redirecting
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('id', response.data.userId);
      

      setTimeout(() => {
        navigate('/dashboard'); // Correct way to navigate
      }, 2000);
      
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Invalid credentials", { autoClose: 2000 });
    }
  };

  return (
    <div className="flex w-full">
      <div className="flex-1 max-w-fit m-auto my-20 shadow-xl rounded-sm p-10 text-center">
        <h1 className="text-3xl font-bold text-center m-auto p-2">Login</h1>
        
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <Input
            type={showPass ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <span>
            <input
              type="checkbox"
              onChange={() => setshowPass(!showPass)}
              className="mx-2"
            />
            Show Password
          </span>

          <Button type="submit" text="Login" color="#21a0d9" />

          <h5>
            New User? <Link to="/register">Sign up</Link>
          </h5>
        </form>
        
        {/* Toast Notification Container */}
        <ToastContainer position="top-right" />
      </div>
    </div>
  );
}

export default Login;
