import { useState } from 'react'
import Signup from './Signup'
import Login from './Login'

import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Chat from './Chat'
import Dashboard from './Dashboard'



function App() {
  
  

  return (
    <>
    <BrowserRouter>

    <Routes>
      <Route path="/register" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/dashboard" element={<Dashboard />} >
            <Route path="/dashboard/chat/:id" element={<Chat/>} />
        
      </Route>

    </Routes>
    </BrowserRouter>
    </>
      
  )
}

export default App
