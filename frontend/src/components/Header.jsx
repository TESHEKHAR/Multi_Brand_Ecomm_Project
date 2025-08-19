import React from 'react';
import { useNavigate } from 'react-router-dom';
import companyLogo from '../assets/logos/logo.png';
import { logoutUser } from '../redux/auth/authSlice';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutOutlined } from '@ant-design/icons';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      toast.success("Logout successful");
      navigate(user?.role === 'admin' ? '/login' : '/');
    } catch {
      toast.error("Failed to logout");
    }
  };

  return (
    <header className="bg-white shadow py-3 px-4 md:px-6 flex justify-between items-center">
      {/* Left - Logo */}
      <div className="flex items-center space-x-2">
        <img src={companyLogo} alt="Logo" className="h-10 w-10 object-contain" />
        <span className="font-bold text-lg md:text-xl text-blue-700">Allied Purchasing Network</span>
      </div>

      {/* Right - Profile Info Like Google */}
      <div className="flex items-center gap-4">
        {/* User Info */}
        <div className="hidden sm:flex flex-col text-right">
          <span className="text-sm font-medium text-gray-800">{user?.name || 'Guest'}</span>
          <span className="text-xs text-gray-500">{user?.email || ''}</span>
        </div>

        {/* Profile Circle */}
        <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm uppercase">
          {user?.name ? user.name.charAt(0) : 'U'}
        </div>

        {/* Logout Icon */}
        <LogoutOutlined
          onClick={handleLogout}
          className="text-red-600 text-xl cursor-pointer hover:text-red-700 transition"
          title="Logout"
        />
      </div>
    </header>
  );
};

export default Header;
