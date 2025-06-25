import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
import BrandSelection from '../pages/BrandSelection';
import BrandProducts from '../pages/BrandProducts';
import Dashboard from '../pages/admin/Dashboard';


const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<BrandSelection />} />
      <Route path="/brand/:brandName" element={<BrandProducts />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
