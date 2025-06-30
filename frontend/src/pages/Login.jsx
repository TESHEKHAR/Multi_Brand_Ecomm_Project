import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../redux/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(loginUser(formData));

      if (loginUser.fulfilled.match(resultAction)){
        const role = resultAction.payload?.user?.role;
        toast.success("Login successful!");
        if (role === "admin"){
          navigate('/admin/dashboard');
        } else {
          navigate('/dashboard');
        }
      } else {
        toast.error(resultAction.payload || "Login failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 bg-cover bg-center relative"
    style={{
      backgroundImage: `url(${require('../assets/logos/login_register_bck.jpg')})`,
    }}>
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;
