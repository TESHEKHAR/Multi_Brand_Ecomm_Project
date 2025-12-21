// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "../pages/Home";
// import Register from "../pages/Register";
// import Login from "../pages/Login";
// import BrandSelection from "../pages/BrandSelection";
// import BrandProducts from "../pages/BrandProducts";
// import Dashboard from "../pages/admin/Dashboard";
// import Users from "../pages/admin/Users";
// import AdminLayout from "../layouts/AdminLayout";
// import Product from "../pages/admin/Product";
// import SetPassword from "../pages/SetPassword";

// const AppRoutes = () => (
//   <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/dashboard" element={<BrandSelection />} />
//       <Route path="/brand/:brandName" element={<BrandProducts />} />
//       <Route path="/admin" element={<AdminLayout />} />
//       <Route path="/set-password" element={<SetPassword />} />

//       <Route
//         path="/admin/users"
//         element={
//           <AdminLayout>
//             <Users />
//           </AdminLayout>
//         }
//       />
//       <Route
//         path="/admin/products"
//         element={
//           <AdminLayout>
//             <Product />
//           </AdminLayout>
//         }
//       />
//       <Route
//         path="/admin/dashboard"
//         element={
//           <AdminLayout>
//             <Dashboard />
//           </AdminLayout>
//         }
//       />
//     </Routes>
//   </BrowserRouter>
// );

// export default AppRoutes;

// import React from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Home from "../pages/Home";
// import Register from "../pages/Register";
// import Login from "../pages/Login";
// import BrandSelection from "../pages/BrandSelection";
// import BrandProducts from "../pages/BrandProducts";
// import Dashboard from "../pages/admin/Dashboard";
// import Users from "../pages/admin/Users";
// import AdminLayout from "../layouts/AdminLayout";
// import Product from "../pages/admin/Product";
// import SetPassword from "../pages/SetPassword";
// import { useSelector } from "react-redux"; // Import useSelector
// import ProtectedRoute from "../components/ProtectedRoute"; // Import your ProtectedRoute

// const AppRoutes = () => {
//   const { accessToken, user } = useSelector((state) => state.auth); // Get auth state

//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Public Routes */}
//         <Route
//           path="/"
//           element={
//             accessToken && user ? (
//               user.role === "admin" ? (
//                 <Navigate to="/admin/dashboard" replace />
//               ) : (
//                 <Navigate to="/dashboard" replace />
//               )
//             ) : (
//               <Home />
//             )
//           }
//         />
//         <Route
//           path="/login"
//           element={
//             accessToken && user ? (
//               user.role === "admin" ? (
//                 <Navigate to="/admin/dashboard" replace />
//               ) : (
//                 <Navigate to="/dashboard" replace />
//               )
//             ) : (
//               <Login />
//             )
//           }
//         />
//         <Route path="/register" element={<Register />} />
//         <Route path="/set-password" element={<SetPassword />} />

//         {/* Protected User Routes */}
//         <Route element={<ProtectedRoute allowedRoles={['user', 'admin']} />}>
//           <Route path="/dashboard" element={<BrandSelection />} />
//           <Route path="/brand/:brandName" element={<BrandProducts />} />
//         </Route>

//         {/* Protected Admin Routes */}
//         <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
//           {/* Base admin route, might redirect to admin dashboard */}
//           <Route path="/admin" element={<AdminLayout><Dashboard /></AdminLayout>} />
//           <Route
//             path="/admin/users"
//             element={
//               <AdminLayout>
//                 <Users />
//               </AdminLayout>
//             }
//           />
//           <Route
//             path="/admin/products"
//             element={
//               <AdminLayout>
//                 <Product />
//               </AdminLayout>
//             }
//           />
//           <Route
//             path="/admin/dashboard"
//             element={
//               <AdminLayout>
//                 <Dashboard />
//               </AdminLayout>
//             }
//           />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default AppRoutes;

// import React from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Home from "../pages/Home";
// import Register from "../pages/Register";
// import Login from "../pages/Login";
// import BrandSelection from "../pages/BrandSelection";
// import BrandProducts from "../pages/BrandProducts";
// import Dashboard from "../pages/admin/Dashboard";
// import Users from "../pages/admin/Users";
// import AdminLayout from "../layouts/AdminLayout";
// import Product from "../pages/admin/Product";
// import SetPassword from "../pages/SetPassword";
// import { useSelector } from "react-redux";
// import ProtectedRoute from "../components/ProtectedRoute";

// const AppRoutes = () => {
//   const { accessToken, user } = useSelector((state) => state.auth);

//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Public Routes with redirection for logged-in users */}
//         <Route
//           path="/"
//           element={
//             accessToken && user ? (
//               user.role === "admin" ? (
//                 <Navigate to="/admin/dashboard" replace />
//               ) : (
//                 <Navigate to="/dashboard" replace />
//               )
//             ) : (
//               <Home />
//             )
//           }
//         />
//         <Route
//           path="/login"
//           element={
//             accessToken && user ? (
//               user.role === "admin" ? (
//                 <Navigate to="/admin/dashboard" replace />
//               ) : (
//                 <Navigate to="/dashboard" replace />
//               )
//             ) : (
//               <Login />
//             )
//           }
//         />
//         <Route
//           path="/register"
//           element={
//             accessToken && user ? (
//               user.role === "admin" ? (
//                 <Navigate to="/admin/dashboard" replace />
//               ) : (
//                 <Navigate to="/dashboard" replace />
//               )
//             ) : (
//               <Register /> // Render Register component only if not logged in
//             )
//           }
//         />
//         <Route path="/set-password" element={<SetPassword />} />

//         {/* Protected User Routes */}
//         <Route element={<ProtectedRoute allowedRoles={['user', 'admin']} />}>
//           <Route path="/dashboard" element={<BrandSelection />} />
//           <Route path="/brand/:brandName" element={<BrandProducts />} />
//         </Route>

//         {/* Protected Admin Routes */}
//         <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
//           {/* Base admin route, might redirect to admin dashboard */}
//           <Route path="/admin" element={<AdminLayout><Dashboard /></AdminLayout>} />
//           <Route
//             path="/admin/users"
//             element={
//               <AdminLayout>
//                 <Users />
//               </AdminLayout>
//             }
//           />
//           <Route
//             path="/admin/products"
//             element={
//               <AdminLayout>
//                 <Product />
//               </AdminLayout>
//             }
//           />
//           <Route
//             path="/admin/dashboard"
//             element={
//               <AdminLayout>
//                 <Dashboard />
//               </AdminLayout>
//             }
//           />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default AppRoutes;

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import BrandSelection from "../pages/BrandSelection";
// import BrandProducts from "../pages/BrandProducts";
import AdminDashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import AdminLayout from "../layouts/AdminLayout";
import Product from "../pages/admin/Product";
import SetPassword from "../pages/SetPassword";
import { useSelector } from "react-redux";
import ProtectedRoute from "../components/ProtectedRoute";
import Brand from "../pages/admin/Brand";
import Category from "../pages/admin/Category";
// import SandiaProduct from "../pages/admin/SandiaProduct"
import ProductDetails from "../pages/ProductDetails";
import BrandHomePage from "../pages/BrandHomePage";
import Cart from "../components/Cart";
import Orders from "../pages/admin/Orders";

const AppRoutes = () => {
  const { accessToken, user } = useSelector((state) => state.auth);

  const getDashboardPath = (loggedInUser) => {
    if (!loggedInUser) return "/login";
    return loggedInUser.role === "admin" ? "/admin/dashboard" : "/dashboard";
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            accessToken && user ? (
              <Navigate to={getDashboardPath(user)} replace />
            ) : (
              <Home />
            )
          }
        />
        <Route
          path="/login"
          element={
            accessToken && user ? (
              <Navigate to={getDashboardPath(user)} replace />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/register"
          element={
            accessToken && user ? (
              <Navigate to={getDashboardPath(user)} replace />
            ) : (
              <Register />
            )
          }
        />
        <Route path="/set-password" element={<SetPassword />} />
        {/* ye login se chalta hai route   */}
        {/* <Route element={<ProtectedRoute allowedRoles={['user']} />}> */}
        {/* User's primary dashboard */}
        {/* <Route path="/dashboard" element={<BrandSelection />} /> */}
        {/* <Route path="/brand/:brandName" element={<BrandProducts />} /> */}
        {/* <Route path="/product/:productId" element={<ProductDetails />} /> */}
        {/* <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/brand/:brandName" element={<BrandHomePage />} />
          <Route path="/cart" element={<Cart />} /> */}
        {/* </Route> */}

        {/* without login ka ab chalega ye sab route */}

        {/* USER PUBLIC ROUTES — LOGIN NOT REQUIRED */}
        <Route path="/dashboard" element={<BrandSelection />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/brand/:brandName" element={<BrandHomePage />} />
        <Route path="/cart" element={<Cart />} />

        {/* Admin-specific Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          {/* Default /admin path redirects to admin dashboard */}
          <Route
            path="/admin"
            element={<Navigate to="/admin/dashboard" replace />}
          />
          {/* Admin's primary dashboard */}
          <Route
            path="/admin/dashboard"
            element={
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            }
          />
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
            path="/admin/brand"
            element={
              <AdminLayout>
                <Brand />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/category"
            element={
              <AdminLayout>
                <Category />
              </AdminLayout>
            }
          />
          {/* <Route path="/admin/sandia-product" element={<AdminLayout><SandiaProduct /></AdminLayout>} /> */}
          <Route
            path="/admin/orders"
            element={
              <AdminLayout>
                <Orders />
              </AdminLayout>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
