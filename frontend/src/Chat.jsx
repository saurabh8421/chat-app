import React, { useEffect, useState, useRef } from 'react';
import { IoMdSend } from "react-icons/io";
import { FaRegSmile } from "react-icons/fa";
import EmojiPicker from 'emoji-picker-react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const {id} = useParams()
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const chatEndRef = useRef(null)
  const receiver = id;
  const sender = localStorage.getItem('id')

  //fetch messages
  useEffect(() => {
    axios.get(`http://localhost:3000/chat/messages/${id}`)
    .then(response => {
        console.log(response.data)
        setMessages(response.data)
        })
        .catch(error => {
            console.error(error);
            });
            }, [id,message]);

            useEffect(() => {
              chatEndRef.current?.scrollIntoView({ });
            }, [messages]);

  const handleEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
        axios.post('http://localhost:3000/chat/send',{sender,receiver,message})
        .then(res => console.log(res.data))
    //   console.log("Message sent:", message);

      setMessage('');

    }
  };

  return (
    <>
    
    <div className="chat-container w-240 h-100 bg-gray-100 overflow-y-scroll custom-scrollbar">
        <div className="chat-header">
            <ul>
            {messages.map((message, index) => (
              <li key={index} className={`flex m-2 ${message.sender !== sender ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-xs p-2 rounded-xl shadow-md ${message.sender !== sender ? 'rounded-tl-none' : 'rounded-tr-none'}`}
                     style={{ backgroundColor: message.sender === sender ? '#ffffff' : '#5ac8fa' }}>
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
    <div className="flex flex-col w-full p-4 border-t ">
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
          className="flex-1 p-2 border rounded-lg"
          placeholder="Type a message"
        />

        <button type="submit" className="text-xl p-2">
          <IoMdSend />
        </button>
      </form>
    </div>
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
    </>
  );
}

export default Chat;
