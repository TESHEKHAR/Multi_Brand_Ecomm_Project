// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const Home = () => {
//   const navigate = useNavigate();

//   return (
//     <div
//       className="min-h-screen flex flex-col bg-cover bg-center relative"
//       style={{
//         backgroundImage: `url(${require('../assets/logos/background.jpg')})`,
//       }}
//     >
//       {/* Overlay for better readability */}
//       <div className="absolute inset-0 bg-black bg-opacity-50 z-0" />

//       {/* Main Content */}
//       <div className="relative z-10 flex flex-col min-h-screen">

//         {/* Header */}
//         {/* <header className="bg-white/90 shadow py-4">
//           <div className="max-w-7xl mx-auto px-4 flex items-center">
//             <img src={logo} alt="Logo" className="h-10 w-10 object-contain mr-2" />
//             <h1 className="text-2xl font-bold text-blue-600">Yourkart</h1>
//           </div>
//         </header> */}

//         {/* Hero Section */}
//         <main className="flex-grow flex flex-col items-center justify-center text-center px-4 text-white">
//           <h2 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Allied Purchasing Network</h2>
//           <p className="text-lg mb-6 max-w-xl">
//           Your one-stop shop for everything — experience seamless online shopping with speed, style, and satisfaction.
//           </p>

//           {/* Centered Buttons */}
//           <div className="flex flex-col md:flex-row gap-4 mt-4">
//             <button
//               onClick={() => navigate('/login')}
//               className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
//             >
//               Login
//             </button>
//             <button
//               onClick={() => navigate('/register')}
//               className="bg-gray-200 text-blue-600 px-6 py-2 rounded hover:bg-gray-300 transition"
//             >
//               Register
//             </button>
//           </div>
//         </main>

//         {/* Footer */}
//         {/* <footer className="bg-white/90 py-4 text-center text-sm text-gray-700">
//           &copy; 2025 Yourkart. All rights reserved.
//         </footer> */}
//       </div>
//     </div>
//   );
// };

// export default Home;

// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const Home = () => {
//   const navigate = useNavigate();

//   return (
//     <div
//       className="min-h-screen flex flex-col bg-white relative" // ✅ White background
//     >
//       {/* Main Content */}
//       <div className="relative z-10 flex flex-col min-h-screen">

//         {/* Hero Section */}
//         <main className="flex-grow flex flex-col items-center justify-center text-center px-4 text-gray-900"> {/* ✅ Text changed to dark color */}
//           <h2 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Allied Purchasing Network</h2>
//           <p className="text-lg mb-6 max-w-xl">
//             Your one-stop shop for everything — experience seamless online shopping with speed, style, and satisfaction.
//           </p>

//           {/* Centered Buttons */}
//           <div className="flex flex-col md:flex-row gap-4 mt-4">
//             <button
//               onClick={() => navigate('/login')}
//               className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
//             >
//               Login
//             </button>
//             <button
//               onClick={() => navigate('/register')}
//               className="bg-gray-200 text-blue-600 px-6 py-2 rounded hover:bg-gray-300 transition"
//             >
//               Register
//             </button>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Home;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import videoBg from '../assets/videos/allied.mp4'; // Replace with your video path

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ maxHeight: '100vh' }}
        src={videoBg}
        autoPlay
        loop
        muted
      />

      {/* Overlay to darken video for readability */}
      <div className="absolute top-0 left-0 w-full h-full"></div>

      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full flex items-center justify-between px-8 py-4 z-10 bg-white">
        <div className="text-black text-2xl font-bold">Allied Purchasing Network</div>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            Register
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Home;


