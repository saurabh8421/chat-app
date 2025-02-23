import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";



const UserMenu = ({ username, userImage, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 capitalize bg-gray-800 text-white px-4 py-2 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
      >
        <img className="w-8 h-8 rounded-full bg-white" src={userImage} alt="User" />
        <span>{username}</span>
        <FaChevronDown />

      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg dark:bg-gray-800">
          <button
            onClick={onLogout}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
