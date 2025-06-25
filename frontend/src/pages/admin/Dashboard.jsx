import React from 'react';
import Sidebar from '../../components/Sidebar'; // ✅ correct casing
import AdminHeader from '../../components/AdminHeader';
import { FaBoxOpen, FaUsers, FaRupeeSign } from 'react-icons/fa';

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 w-full">
        {/* Top Header */}
        <AdminHeader />

        {/* Dashboard content below header */}
        <main className="pt-20 px-6 pb-10 bg-gray-50 min-h-screen">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Overview</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
              <div className="bg-blue-100 p-4 rounded-full text-blue-600">
                <FaBoxOpen size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Products</p>
                <h3 className="text-xl font-bold text-gray-800">120</h3>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
              <div className="bg-green-100 p-4 rounded-full text-green-600">
                <FaUsers size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Users</p>
                <h3 className="text-xl font-bold text-gray-800">85</h3>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
              <div className="bg-yellow-100 p-4 rounded-full text-yellow-600">
                <FaRupeeSign size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Revenue</p>
                <h3 className="text-xl font-bold text-gray-800">₹1,25,000</h3>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
