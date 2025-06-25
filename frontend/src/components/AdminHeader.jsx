// components/AdminHeader.jsx
import React from 'react';

const AdminHeader = () => {
  return (
    <header className="h-16 bg-white shadow px-6 flex justify-between items-center fixed top-0 left-64 right-0 z-10">
      {/* Title or Breadcrumb */}
      <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <span className="text-gray-700 text-sm">Admin</span>
        <img
          src="https://i.pravatar.cc/40"
          alt="Admin Avatar"
          className="h-10 w-10 rounded-full object-cover"
        />
        <button className="text-sm text-red-500 hover:underline">Logout</button>
      </div>
    </header>
  );
};

export default AdminHeader;
