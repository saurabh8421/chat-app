import React, { useState,useEffect } from 'react'
import { NavLink } from 'react-router-dom'
// import { useEffect,useState } from 'react';
import axios from 'axios';
import { useNavigate,Outlet } from 'react-router-dom';
import userIcon from '../src/assets/UserIcon.png'
import ThemeSwitcher from './components/ThemeSwitcher';
import applogo from '../src/assets/chat_app.png'
import UserMenu from './components/UserMenu';



function Dashboard() {

    //getall members for chat list
    const [members, setMembers] = useState([])
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const userName = localStorage.getItem("name") || "John Doe"; // Replace with actual username
    const navigate = useNavigate()
    const handleLogout = () => {
      console.log("User logged out");
      localStorage.clear();
      navigate("/login");
    };
    
    //fetch all members form server
    useEffect(() => {
      const userId =  console.log(localStorage.getItem('id'))
        axios
          .get('https://chat-app-ssra.onrender.com/auth/getallmembers')
          .then(response => {
            // Assuming the members data is in response.data
            setMembers(response.data);
          })
          .catch(error => {
            console.error("Error fetching members:", error);
          });
      }, []);

    
      



  return (
    <>

    

<nav className=" top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
  <div className="px-3 py-3 lg:px-5 lg:pl-3">
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-start rtl:justify-end">
        

        <NavLink to="/dashboard/" className={ ` active:bg-gray-400 flex ms-2 md:me-24`}>
        <img src={applogo} alt="Flowbite Logo" className="w-10 h-8" />
        
          
          <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">ChatApp</span>
        </NavLink>
      </div>
      <div className="flex items-center">
      <ThemeSwitcher/>
          <div className="flex items-center ms-3">
            <div>
            <UserMenu username={userName} onLogout={handleLogout} userImage={userIcon} />
            </div>
            
          </div>
        </div>
    </div>
  </div>
</nav>
<div className='flex'> 

<aside id="logo-sidebar" className={`max-h-screen md:h-auto fixed md:relative ${isSidebarOpen?"hidden":"block"}  md:block flex-auto top-0 left-0 z-40 w-64 h-screen pt-1 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar`}>
   <div className=" px-3 overflow-y-auto bg-white dark:bg-gray-800 ">
      <ul className="space-y-2 font-medium">



        {
            members.map((member, index) => {
                return (
                    <li key={index}>
            

<NavLink 
  to={`/dashboard/chat/${member._id}`} 
  className={({ isActive }) => 
    `flex capitalize items-center p-2 rounded-lg group 
    ${isActive ? "bg-blue-500 text-white dark:bg-blue-600" : "text-gray-900 dark:text-white"} 
    hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-700`
  }
>
  <img src={userIcon} className="max-w-10 rounded-full bg-gray-200" alt="Avatar" />
  <span className="ml-3">{member.name}</span>
</NavLink>

                    </li>

                )
        })}
         {/* <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               
               <span className="ms-3">Dashboard</span>
            </a>
         </li> */}
        
      </ul>
   </div>
</aside>

<div className="p-4 flex-auto bottom-0 max-w-screen">
   <div className="text w-full  border-2 border-gray-200 dark:border-gray-700 max-w-screen">
      <Outlet/>
    
   </div>
   </div>
</div>

    </>
  )
}


export default Dashboard
