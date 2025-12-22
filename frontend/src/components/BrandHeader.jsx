import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MenuOutlined, CloseOutlined, LogoutOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/auth/authSlice";
import { toast } from "react-toastify";
import logoVideo from "../assets/videos/allied_logo.mp4";

const BrandHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const isCartEmpty = cartItems.length === 0;

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      setMenuOpen(false);
      toast.success("Logout successful");
      navigate("/");
    } catch {
      toast.error("Failed to logout");
    }
  };

  const mobileItemClass = `
    font-bold text-lg
    px-4 py-3 rounded-lg
    text-gray-800
    hover:bg-blue-600 hover:text-white
    active:bg-blue-700 active:text-white
    focus:bg-blue-600 focus:text-white
    transition-all duration-200
    cursor-pointer
  `;

  return (
    <>
      {/* NAVBAR */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* LOGO - LEFT */}
            <div
              onClick={() => navigate("/")}
              className="cursor-pointer flex items-center"
            >
              <video
                src={logoVideo}
                autoPlay
                loop
                muted
                playsInline
                className="h-12 w-auto object-contain"
              />
            </div>

            {/* DESKTOP MENU - RIGHT */}
            <nav className="hidden md:flex items-center gap-8 font-bold text-gray-700">
              <span
                onClick={() => navigate("/")}
                className="hover:text-blue-600 transition cursor-pointer"
              >
                Home
              </span>

              {!isCartEmpty && (
                <span
                  onClick={() => navigate("/cart")}
                  className="relative hover:text-blue-600 transition cursor-pointer"
                >
                  Cart
                  <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartItems.length}
                  </span>
                </span>
              )}

              {!user ? (
                <>
                  <span
                    onClick={() => navigate("/login")}
                    className="hover:text-blue-600 transition cursor-pointer"
                  >
                    Login
                  </span>

                  <span
                    onClick={() => navigate("/register")}
                    className="hover:text-blue-600 transition cursor-pointer"
                  >
                    Register
                  </span>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <span className="text-sm">{user.name}</span>
                  <div className="h-9 w-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center uppercase font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <LogoutOutlined
                    onClick={handleLogout}
                    className="text-red-600 text-lg cursor-pointer"
                  />
                </div>
              )}
            </nav>

            {/* MOBILE MENU BUTTON */}
            <button
              className="md:hidden text-2xl text-gray-700"
              onClick={() => setMenuOpen(true)}
            >
              <MenuOutlined />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black bg-opacity-40"
            onClick={() => setMenuOpen(false)}
          />

          <div className="relative w-64 bg-white h-full shadow-lg p-6 pt-14 flex flex-col gap-3 animate-slide-in">
            <button
              className="absolute top-4 right-4 text-2xl"
              onClick={() => setMenuOpen(false)}
            >
              <CloseOutlined />
            </button>

            {/* HOME */}
            <span
              onClick={() => {
                navigate("/");
                setMenuOpen(false);
              }}
              className={mobileItemClass}
            >
              Home
            </span>

            {/* CART */}
            {!isCartEmpty && (
              <span
                onClick={() => {
                  navigate("/cart");
                  setMenuOpen(false);
                }}
                className={mobileItemClass}
              >
                Cart ({cartItems.length})
              </span>
            )}

            {!user ? (
              <>
                <span
                  onClick={() => {
                    navigate("/login");
                    setMenuOpen(false);
                  }}
                  className={mobileItemClass}
                >
                  Login
                </span>

                <span
                  onClick={() => {
                    navigate("/register");
                    setMenuOpen(false);
                  }}
                  className={mobileItemClass}
                >
                  Register
                </span>
              </>
            ) : (
              <div className="flex items-center gap-3 mt-4 px-4">
                <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  {user.name.charAt(0)}
                </div>
                <span className="flex-1 font-bold">{user.name}</span>
                <LogoutOutlined
                  onClick={handleLogout}
                  className="text-red-600 text-xl cursor-pointer"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* SLIDE IN ANIMATION */}
      <style>
        {`
          @keyframes slide-in {
            from { transform: translateX(-100%); }
            to { transform: translateX(0); }
          }
          .animate-slide-in {
            animation: slide-in 0.3s ease-out forwards;
          }
        `}
      </style>
    </>
  );
};

export default BrandHeader;
