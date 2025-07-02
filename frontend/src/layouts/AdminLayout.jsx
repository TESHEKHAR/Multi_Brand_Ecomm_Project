// src/layouts/AdminLayout.jsx
import React from 'react';
import Sidebar from '../components/Sidebar';
import AdminHeader from '../components/AdminHeader';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full">
        <AdminHeader />
        <main className="pt-20 px-6 pb-10 bg-gray-50 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
