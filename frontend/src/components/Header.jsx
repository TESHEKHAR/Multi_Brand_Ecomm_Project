import React from 'react';
import { useNavigate } from 'react-router-dom';
import companyLogo from '../assets/logos/company.jpg';
import userProfile from '../assets/logos/user.jpg';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Logging out...');
    navigate('/login');
  };

  return (
    <header className="bg-white shadow py-4 px-6 flex justify-between items-center">
      {/* Company Logo */}
      <div className="flex items-center space-x-2">
        <img src={companyLogo} alt="Logo" className="h-10 w-10 object-contain" />
        <span className="font-bold text-xl text-blue-700">MyBrand</span>
      </div>

      {/* User Info */}
      <div className="flex items-center space-x-4">
        <img
          src={userProfile}
          alt="User"
          className="h-10 w-10 rounded-full border border-gray-300 object-cover"
        />
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
