import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Input from './components/Input'
import Button from './components/Button'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
    const [showPass,setshowPass] =useState(false)
    const [name,setname] = useState()
    const [password,setPassword] = useState()
    const [email,setEmail]= useState()


    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:3000/auth/register',{name,password,email})
        .then(result=>{console.log("result",result)
            toast.success("Registration successful!", { autoClose: 2000 });
            
            setTimeout(() => {
                window.location.href = "/login"; // Change this to your protected route
              }, 2000);

        })
    .catch((err)=>{console.log(err)

       
            toast.error(err.response?.data?.message || "Invalid credentials", { autoClose: 2000 });
          
    })
    }

  return (
    <div className=' flex w-full'>
        <div className='flex-1 max-w-fit m-auto my-20 shadow-xl rounded-sm p-10 text-center'>
            
            <h1 className='text-3xl font-bold text-center m-auto p-2'>Signup</h1>
            <form className='flex flex-col' onSubmit={handleSubmit}>
                <Input
                type='text'
                placeholder='Name'
                onChange={
                    (e)=>setname(e.target.value)
                }
                
                />
                <Input
                type='text'
                placeholder='Email'
                onChange={(e)=>setEmail(e.target.value)}
                />
                <Input
                type={showPass?"text":"password"}
                placeholder='Enter Password'
                onChange={(e)=>setPassword(e.target.value)}
                
                />
                <span><input type='checkbox' name='show-password' onChange={()=>showPass?setshowPass(false):setshowPass(true)} className='mx-2'/>Show Password</span>
                
                <Button
                type='submit'
                text='Sign up'
                color="#21a0d9"
                
                />
                <h5>Already registered? <Link to="/login">Login</Link></h5>
                

            </form>
            <ToastContainer position="top-right" />

        </div>
      
    </div>
  )
}

export default Signup
