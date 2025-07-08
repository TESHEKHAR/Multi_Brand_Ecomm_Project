import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap(); // unwrap to catch errors cleanly
      toast.success('Admin logged out');
      navigate('/'); // or navigate('/') if desired
    } catch (err) {
      toast.error('Logout failed');
    }
  };

  return (
    <header className="h-16 bg-white shadow px-6 flex justify-between items-center fixed top-0 left-64 right-0 z-10">
      {/* Title */}
      <h1 className="text-lg font-semibold text-gray-800">Admin Dashboard</h1>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <span className="text-gray-700 text-sm">{user?.name || 'Admin'}</span>
        <img
          src="https://i.pravatar.cc/40"
          alt="Admin Avatar"
          className="h-10 w-10 rounded-full object-cover"
        />
        <button
          onClick={handleLogout}
          className="text-sm text-red-500 hover:underline"
        >
          Logout
        </button>
      </div>
    </header>
  );
};
 
export default AdminHeader;
