import React from "react";
import { Link } from "react-router-dom";
import applogo from '../src/assets/chat_app.png'

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col justify-center items-center text-white p-6">
        <img src={applogo} alt="logo" className="w-24 h-24
        " />
      <h1 className="text-5xl font-bold mb-4">Welcome to ChatApp</h1>
      <p className="text-lg text-center max-w-2xl mb-6">
        Connect with friends, family, and colleagues instantly with our secure and user-friendly chat application.
      </p>
      <div className="flex space-x-4">
        <Link
          to="/login"
          className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold shadow-lg hover:bg-gray-200 transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold shadow-lg hover:bg-gray-200 transition"
        >
          Sign Up
        </Link>
      </div>
      <div className="mt-10 text-center">
        <p className="text-sm">Start chatting today and stay connected!</p>
      </div>
    </div>
  );
}

export default LandingPage;
