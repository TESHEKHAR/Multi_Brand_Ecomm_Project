import React from 'react';
import { FaBoxOpen, FaUsers, FaRupeeSign } from 'react-icons/fa';

const Dashboard = () => {
  return (
    <div className="flex flex-col">
      <main className="pt-6 px-4 md:px-6 pb-10 bg-gray-50 min-h-screen w-full">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 text-center md:text-left">
          Overview
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Product Card */}
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-md flex items-center gap-4">
            <div className="bg-blue-100 p-3 md:p-4 rounded-full text-blue-600">
              <FaBoxOpen size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Products</p>
              <h3 className="text-lg md:text-xl font-bold text-gray-800">120</h3>
            </div>
          </div>

          {/* Users Card */}
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-md flex items-center gap-4">
            <div className="bg-green-100 p-3 md:p-4 rounded-full text-green-600">
              <FaUsers size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <h3 className="text-lg md:text-xl font-bold text-gray-800">85</h3>
            </div>
          </div>

          {/* Revenue Card */}
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-md flex items-center gap-4">
            <div className="bg-yellow-100 p-3 md:p-4 rounded-full text-yellow-600">
              <FaRupeeSign size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Revenue</p>
              <h3 className="text-lg md:text-xl font-bold text-gray-800">₹1,25,000</h3>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
