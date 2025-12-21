import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MenuOutlined, CloseOutlined, LogoutOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/auth/authSlice";
import { toast } from "react-toastify";

const BrandHeader = ({ logo }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const isCartEmpty = cartItems.length === 0;

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      toast.success("Logout successful");
      navigate("/");
    } catch {
      toast.error("Failed to logout");
    }
  };

  return (
    <header className="bg-white shadow-md px-4 py-3">
      <div className="flex justify-between items-center">

        {/* ✅ LOGO / HOME → ALWAYS GO TO "/" */}
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer flex items-center gap-2"
        >
          {logo && (
            <img
              src={logo}
              alt="Brand Logo"
              className="h-full w-full object-contain"
            />
          )}
        </div>

        {/* ---------------- DESKTOP MENU ---------------- */}
        <nav className="hidden md:flex items-center gap-6">

          {/* HOME */}
          <span
            onClick={() => navigate("/")}
            className="text-gray-700 font-medium hover:text-blue-600 cursor-pointer"
          >
            Home
          </span>

          {/* CART (DISABLED IF EMPTY) */}
          {isCartEmpty ? (
            <span className="text-gray-400 cursor-not-allowed relative">
              Cart
            </span>
          ) : (
            <Link
              to="/cart"
              className="text-gray-700 font-medium hover:text-blue-600 relative"
            >
              Cart
              <span className="absolute -top-2 -right-5 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            </Link>
          )}

          {/* USER PROFILE + LOGOUT */}
          {user && (
            <>
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-sm font-medium">{user.name}</span>
                <span className="text-xs text-gray-500">{user.email}</span>
              </div>

              <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold uppercase">
                {user.name.charAt(0)}
              </div>

              <LogoutOutlined
                onClick={handleLogout}
                className="text-red-600 text-xl cursor-pointer hover:text-red-700"
              />
            </>
          )}
        </nav>

        {/* ---------------- MOBILE TOGGLE ---------------- */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <CloseOutlined /> : <MenuOutlined />}
        </button>
      </div>

      {/* ---------------- MOBILE MENU ---------------- */}
      {menuOpen && (
        <div className="md:hidden mt-3 flex flex-col gap-3 border-t pt-3">

          {/* HOME */}
          <span
            onClick={() => {
              navigate("/");
              setMenuOpen(false);
            }}
            className="text-gray-700 font-medium cursor-pointer"
          >
            Home
          </span>

          {/* CART */}
          {isCartEmpty ? (
            <span className="text-gray-400 cursor-not-allowed">
              Cart
            </span>
          ) : (
            <span
              onClick={() => {
                navigate("/cart");
                setMenuOpen(false);
              }}
              className="text-gray-700 font-medium cursor-pointer relative"
            >
              Cart ({cartItems.length})
            </span>
          )}

          {/* LOGOUT */}
          {user && (
            <div className="flex items-center gap-3 mt-3">
              <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold uppercase">
                {user.name.charAt(0)}
              </div>
              <span className="flex-1">{user.name}</span>
              <LogoutOutlined
                onClick={handleLogout}
                className="text-red-600 text-xl cursor-pointer"
              />
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default BrandHeader;
