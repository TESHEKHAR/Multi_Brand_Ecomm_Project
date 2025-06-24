import React from 'react';
import { useNavigate } from 'react-router-dom'; // Optional if you're handling navigation

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen flex flex-col">
      
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 shadow">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">MyApp</h1>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Welcome to MyApp</h2>
        <p className="text-gray-600 text-lg mb-6 max-w-xl">
          Build modern applications fast with React and Tailwind CSS.
        </p>
        
        {/* Centered Buttons */}
        <div className="flex space-x-4 mt-4">
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="bg-gray-200 text-blue-600 px-6 py-2 rounded hover:bg-gray-300 transition"
          >
            Register
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-4 text-center text-sm text-gray-500">
        &copy; 2025 MyApp. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
