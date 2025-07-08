// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const ProtectedRoute = ({ allowedRoles }) => {
//   const { user, accessToken } = useSelector((state) => state.auth);

//   if (!accessToken || !user) {
//     // Not logged in, redirect to login
//     return <Navigate to="/login" replace />;
//   }

//   if (allowedRoles && !allowedRoles.includes(user.role)) {
//     // Logged in but not authorized for this role, redirect to dashboard or an unauthorized page
//     return <Navigate to="/dashboard" replace />; // Or a specific /unauthorized page
//   }

//   // User is logged in and authorized, render the child routes/components
//   return <Outlet />;
// };

// export default ProtectedRoute;

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, accessToken } = useSelector((state) => state.auth);

  if (!accessToken || !user) {
    // 1. Not logged in: redirect to login
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // 2. Logged in, but NOT authorized for this specific route's role(s)
    // Redirect to their *correct* dashboard based on their actual role
    const redirectToPath = user.role === 'admin' ? '/admin/dashboard' : '/dashboard';
    return <Navigate to={redirectToPath} replace />;
  }

  // 3. Logged in AND authorized: render the child routes/components
  return <Outlet />;
};

export default ProtectedRoute;