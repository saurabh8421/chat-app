import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
// import { useEffect,useState } from 'react';
import axios from 'axios';
import { useNavigate,Outlet } from 'react-router-dom';
import userIcon from '../src/assets/UserIcon.png'

function Dashboard() {

    //getall members for chat list
    const [members, setMembers] = useState([])
    
    //fetch all members form server
    useEffect(() => {
      console.log(localStorage.getItem('id'))
        axios
          .get('http://localhost:3000/auth/getallmembers')
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
        <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
               <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
         </button>
        <a href="https://flowbite.com" className="flex ms-2 md:me-24">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 me-3" alt="FlowBite Logo" />
          <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">My-Chat</span>
        </a>
      </div>
      <div className="flex items-center">
          <div className="flex items-center ms-3">
            <div>
              <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                <span className="sr-only">Open user menu</span>
                <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo"/>
              </button>
            </div>
            
          </div>
        </div>
    </div>
  </div>
</nav>
<div className='flex '> 

<aside id="logo-sidebar" className="flex-auto top-0 left-0 z-40 w-64 h-screen pt-1 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
   <div className=" px-3 overflow-y-auto bg-white dark:bg-gray-800">
      <ul className="space-y-2 font-medium">



        {
            members.map((member, index) => {
                return (
                    <li key={index}>
                        <Link to={`/dashboard/chat/${member._id}`} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white active:bg-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <img src={userIcon} className=' max-w-10 rounded-full bg-gray-200' alt="Avatar"  />
                            <span className="ml-3">{member.name}</span>
                        </Link>
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

<div className="p-4 flex-auto bottom-0 ">
   <div className="text w-full  border-2 border-gray-200 dark:border-gray-700">
      <Outlet/>
    
   </div>
   </div>
</div>

    </>
  )
}


export default Dashboard
