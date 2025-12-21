import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaBox, FaUsers, FaShoppingCart } from 'react-icons/fa';

const Sidebar = () => {
  const linkClass =
    'flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition text-sm font-medium';

  const activeClass = 'bg-gray-700 text-white';

  return (
    <aside className="w-64 h-screen bg-gray-900 text-gray-100 p-6 fixed shadow-lg">
      {/* Brand */}
      <div className="mb-10 text-xl font-bold tracking-wide text-center text-white">
        Allied Purchasing 
      </div>

      {/* Navigation */}
      <nav className="space-y-3">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : 'text-gray-300'}`
          }
        >
          <FaTachometerAlt />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/brand"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : 'text-gray-300'}`
          }
        >
          <FaBox />
          Brand
        </NavLink>

        <NavLink
          to="/admin/category"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : 'text-gray-300'}`
          }
        >
          <FaBox />
          Category
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : 'text-gray-300'}`
          }
        >
          <FaBox />
          Products
        </NavLink>
        {/* <NavLink
          to="/admin/sandia-product"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : 'text-gray-300'}`
          }
        >
          <FaBox />
          Sandia Products
        </NavLink> */}

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : 'text-gray-300'}`
          }
        >
          <FaUsers />
          Users
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : 'text-gray-300'}`
          }
        >
          <FaShoppingCart />
          Orders
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
