import { useState } from 'react'
import Signup from './Signup'
import Login from './Login'
import Home from './Home'

import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Chat from './Chat'
import Dashboard from './Dashboard'
import D_home from './D_home'



function App() {
  
  

  return (
    <>
    <BrowserRouter>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/dashboard" element={<Dashboard />} >
            <Route path="/dashboard/chat/:id" element={<Chat/>} />
            <Route path="/dashboard/" element={<D_home/>} />
        
      </Route>

    </Routes>
    </BrowserRouter>
    </>
      
  )
}

export default App
