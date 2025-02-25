import React from 'react'
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';


import axios from 'axios';
import { Link,NavLink } from 'react-router-dom';
import userIcon from '../src/assets/UserIcon.png'



function D_home() {
    const [members, setMembers] = useState([])
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const isMobile = useMediaQuery({ query: `(max-width: 760px)` });


    const navigate = useNavigate();
    //fetch all members form server
    useEffect(() => {
      const id =localStorage.getItem('id')
      if(!id){
        navigate('/login')
        }
        else{
          axios
          .get('https://chat-app-ssra.onrender.com/auth/getallmembers')
          .then(response => {
            // Assuming the members data is in response.data
            setMembers(response.data);
          })
          .catch(error => {
            console.error("Error fetching members:", error);
          });
        }
      }, []);

  if(isMobile){
    return (
        <div>
          <ul>
    
    
            {
                members.map((member, index) => {
                    return (
                        <li key={index}>
               

<NavLink 
  to={`/dashboard/chat/${member._id}`} 
  className={({ isActive }) => 
    `flex capitalize items-center p-2 rounded-lg group 
    ${isActive ? "bg-blue-500 text-white dark:bg-blue-600" : "text-gray-900 dark:text-white"} 
    hover:bg-gray-100 dark:hover:bg-gray-700`
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
    
      )
  }
  else{
    return (
        <>
          <div className="chat-container md:w-240 h-screen max-h-[calc(100vh-100px)] bg-gray-100 overflow-y-scroll custom-scrollbar p-4 max-w-screen">
            <div className="chat-header max-w-screen">
                <div className="flex justify-between items-center">
                    <h1 className="text-lg font-bold text-gray-900">Start Chat</h1>
                </div>
              
            </div>
          </div>
    
          
        </>
      );
  }
}

export default D_home
