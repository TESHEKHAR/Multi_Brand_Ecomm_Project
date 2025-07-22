import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaBoxOpen, FaUsers, FaRupeeSign } from 'react-icons/fa';
import { getProducts } from '../../redux/product/productSlice';
import { fetchUsers } from '../../redux/user/userSlice';
import { getOrders } from '../../redux/order/orderSlice';

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.product);
  const { users } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(fetchUsers());
    dispatch(getOrders());
  }, [dispatch]);

  // Calculate revenue from orders
  const totalRevenue = orders?.reduce((acc, order) => acc + (order.totalAmount || 0), 0);

  return (
    <div className="flex flex-col">
      <main className="pt-6 px-4 md:px-6 pb-10 bg-gray-50 min-h-screen w-full">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 text-center md:text-left">
          Overview
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Products */}
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-md flex items-center gap-4">
            <div className="bg-blue-100 p-3 md:p-4 rounded-full text-blue-600">
              <FaBoxOpen size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Products</p>
              <h3 className="text-lg md:text-xl font-bold text-gray-800">{products?.length || 0}</h3>
            </div>
          </div>

          {/* Users */}
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-md flex items-center gap-4">
            <div className="bg-green-100 p-3 md:p-4 rounded-full text-green-600">
              <FaUsers size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <h3 className="text-lg md:text-xl font-bold text-gray-800">{users?.length || 0}</h3>
            </div>
          </div>

          {/* Revenue */}
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-md flex items-center gap-4">
            <div className="bg-yellow-100 p-3 md:p-4 rounded-full text-yellow-600">
              <FaRupeeSign size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Revenue</p>
              <h3 className="text-lg md:text-xl font-bold text-gray-800">
                ₹{totalRevenue?.toLocaleString('en-IN') || '0'}
              </h3>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
