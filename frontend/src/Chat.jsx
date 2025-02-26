import React, { useEffect, useState, useRef } from 'react';
import { IoMdSend } from "react-icons/io";
import { FaRegSmile } from "react-icons/fa";
import EmojiPicker from 'emoji-picker-react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { io } from "socket.io-client";

const socket = io('https://chat-app-ssra.onrender.com'); 
function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const chatEndRef = useRef(null);

  const { id } = useParams();
  const receiver = id;
  const sender = localStorage.getItem('id');

  useEffect(() => {
    socket.emit('join', sender); 

    socket.on('receiveMessage', (newMessage) => {
      console.log('New Message Received:', newMessage);
      setMessages(prev => [...prev, newMessage]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [sender]);

  // Fetch previous messages
  useEffect(() => {
    if (!receiver || !sender) return;

    axios.get(`https://chat-app-ssra.onrender.com/chat/messages/${receiver}?userId=${sender}`)
      .then(response => setMessages(response.data))
      .catch(error => console.error("Error fetching messages:", error));

  }, [receiver, sender]);

  // Auto-scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleEmojiClick = (emojiData) => {
    setMessage(prev => prev + emojiData.emoji);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = { sender, receiver, message, createdAt: new Date().toISOString() };

    try {
      const res = await axios.post('https://chat-app-ssra.onrender.com/chat/send', newMessage);
      if (res.status === 200) {
        setMessages(prev => [...prev, newMessage]); // Optimistic update
        socket.emit('sendMessage', newMessage); // Send message via WebSocket
        setMessage('');
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <>
      <div className="chat-container md:w-240 h-screen max-h-[calc(100vh-180px)] bg-sky-100 overflow-y-scroll custom-scrollbar p-4 max-w-screen">
        <div className="chat-header max-w-screen bg-sky-100">
          <ul>
            {messages.length > 0 &&
              messages.map((message, index) => (
                <li key={index} className={`flex m-2 ${message.sender !== sender ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-xs p-2 rounded-xl shadow-md ${message.sender === sender ? 'rounded-tl-none' : 'rounded-tr-none'}`}
                    style={{ backgroundColor: message.sender !== sender ? '#ffffff' : '#5ac8fa' }}>
                    <p className="text-black">
                      {message.message}
                      <sub className="pl-4 text-gray-500 text-xs">
                        {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </sub>
                    </p>
                  </div>
                </li>
              ))}
            <div ref={chatEndRef}></div>
          </ul>
        </div>
      </div>

      <div className="flex flex-col w-full p-4 border-t bg-sky-200 dark:bg-slate-900 dark:text-white">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <button
            type="button"
            className="text-xl p-2"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <FaRegSmile />
          </button>

          {showEmojiPicker && (
            <div className="absolute bottom-16 left-4 z-100">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 p-2 border rounded-lg bg-gray-100 text-black border-sky-400"
            placeholder="Type a message"
          />

          <button type="submit" className="text-xl p-2">
            <IoMdSend />
          </button>
        </form>
      </div>
      <style>
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }

          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 10px;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
        `}
      </style>
      </style>
    </>
  );
}

export default Chat;
