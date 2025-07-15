import axios from '../api/axiosInstance';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateFields = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    try {
      await axios.post('/register', formData);
      toast.success(
        'Thank you for registering. Your request is under review. You will receive an email once approved.'
      );
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      {/* Background Image with Blur and Brightness */}
      <img
        src={require('../assets/logos/login_register_bck.jpg')}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover filter blur-sm brightness-75 z-0"
      />

      {/* Registration Form */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md z-10 relative">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label htmlFor="name" className="block mb-1 font-medium text-gray-700">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 ${
                errors.name ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'
              }`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 ${
                errors.email ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block mb-1 font-medium text-gray-700">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 ${
                errors.phone ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'
              }`}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* Company Name */}
          <div>
            <label htmlFor="companyName" className="block mb-1 font-medium text-gray-700">
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="companyName"
              id="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 ${
                errors.companyName ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'
              }`}
            />
            {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
