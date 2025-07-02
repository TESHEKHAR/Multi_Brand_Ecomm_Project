import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
import BrandSelection from '../pages/BrandSelection';
import BrandProducts from '../pages/BrandProducts';
import Dashboard from '../pages/admin/Dashboard';
import Users from '../pages/admin/Users';
import AdminLayout from '../layouts/AdminLayout';
import Product from '../pages/admin/Product';


const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<BrandSelection />} />
      <Route path="/brand/:brandName" element={<BrandProducts />} />
      <Route path="/admin" element={<AdminLayout />} />



      <Route
  path="/admin/users"
  element={
    <AdminLayout>
      <Users />
    </AdminLayout>
  }
/>
<Route
  path="/admin/products"
  element={
    <AdminLayout>
      <Product />
    </AdminLayout>
  }
/>
<Route
  path="/admin/dashboard"
  element={
    <AdminLayout>
      <Dashboard />
    </AdminLayout>
  }
/>

    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
