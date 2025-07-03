import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPassword } from '../redux/user/userSlice';
import { useLocation, useNavigate } from 'react-router-dom';

const SetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  const userId = queryParams.get('id');

  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const { setPasswordLoading, error } = useSelector((state) => state.user);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    dispatch(
      setPassword({
        userId,
        token,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      })
    ).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        alert('Password set successfully');
        navigate('/login'); 
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Set Your Password</h2>

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          disabled={setPasswordLoading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {setPasswordLoading ? 'Setting...' : 'Set Password'}
        </button>
      </form>
    </div>
  );
};

export default SetPassword;
