import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  MenuOutlined,
  CloseOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/auth/authSlice";
import { toast } from "react-toastify";

const BrandHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart?.cartItems || []);

  const cartCount = cartItems.reduce(
    (total, item) => total + (Number(item.quantity) || 1),
    0
  );

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scrolling on mobile menu
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Navigation
  const handleNavigation = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  // Scroll to section
  const scrollToSection = (sectionId) => {
    setMenuOpen(false);

    if (location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({
          behavior: "smooth",
        });
      }, 400);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      setLoggingOut(true);

      await dispatch(logoutUser()).unwrap();

      toast.success("Logout successful!");
      setMenuOpen(false);
      navigate("/");
    } catch (error) {
      toast.error(error?.message || "Failed to logout");
    } finally {
      setLoggingOut(false);
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "FAQ", path: "/faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0a1311]/95 backdrop-blur-xl border-b border-[#f2b84b]/20 shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <button
            onClick={() => handleNavigation("/")}
            className="flex items-center gap-3 text-left group"
            aria-label="Allied Purchasing Network Home"
          >
            <span className="text-3xl font-black tracking-tight text-[#f2b84b] group-hover:text-[#f4ead0] transition-colors duration-300">
              APN
            </span>

            <span className="flex flex-col text-[9px] sm:text-[10px] font-bold tracking-[0.16em] leading-[1.5] text-[#f4ead0]">
              <span>ALLIED PURCHASING</span>
              <span>NETWORK</span>
            </span>
          </button>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;

              return (
                <button
                  key={link.name}
                  onClick={() => handleNavigation(link.path)}
                  className={`relative py-2 text-sm font-semibold tracking-wide transition-all duration-300
                    ${
                      active
                        ? "text-[#f2b84b]"
                        : "text-[#f4ead0] hover:text-[#f2b84b]"
                    }
                    after:absolute after:left-0 after:bottom-0 after:h-[2px]
                    after:bg-[#f2b84b] after:transition-all after:duration-300
                    ${active ? "after:w-full" : "after:w-0 hover:after:w-full"}`}
                >
                  {link.name}
                </button>
              );
            })}
          </nav>

          {/* HEADER ACTIONS */}
          <div className="flex items-center gap-4 sm:gap-5">
            {/* CART */}
            <button
              onClick={() => handleNavigation("/cart")}
              className="relative text-xl text-[#f4ead0] hover:text-[#f2b84b] transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingCartOutlined />

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 min-w-5 h-5 px-1 flex items-center justify-center rounded-full bg-[#f2b84b] text-[#0a1311] text-[10px] font-black">
                  {cartCount}
                </span>
              )}
            </button>

            {/* LOGIN / LOGOUT */}
            {user ? (
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="hidden sm:flex items-center gap-2 text-sm font-semibold text-[#f4ead0] hover:text-[#f2b84b] transition-colors"
              >
                <LogoutOutlined />
                {loggingOut ? "Logging out..." : "Logout"}
              </button>
            ) : (
              <button
                onClick={() => handleNavigation("/login")}
                className="hidden sm:block text-sm font-semibold text-[#f4ead0] hover:text-[#f2b84b] transition-colors"
              >
                Login
              </button>
            )}

            {/* PROCUREMENT REVIEW BUTTON */}
            <button
              onClick={() => scrollToSection("review")}
              className="hidden md:flex items-center gap-3 px-5 py-3 rounded-full bg-[#f2b84b] text-[#0a1311] text-xs font-black tracking-wide hover:bg-[#f4ead0] transition-all duration-300"
            >
              Free Procurement Review
              <ArrowRightOutlined />
            </button>

            {/* MOBILE MENU ICON */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-2xl text-[#f4ead0] hover:text-[#f2b84b] transition-colors"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <CloseOutlined /> : <MenuOutlined />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full overflow-hidden transition-all duration-500 ${
          menuOpen
            ? "max-h-[600px] opacity-100 visible"
            : "max-h-0 opacity-0 invisible"
        }`}
      >
        <div className="bg-[#0a1311] border-t border-[#f2b84b]/20 px-6 py-6 shadow-2xl">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavigation(link.path)}
                className={`text-left px-4 py-3 rounded-lg font-semibold transition-all ${
                  location.pathname === link.path
                    ? "text-[#f2b84b] bg-[#14211d]"
                    : "text-[#f4ead0] hover:text-[#f2b84b] hover:bg-[#14211d]"
                }`}
              >
                {link.name}
              </button>
            ))}

            <button
              onClick={() => handleNavigation("/cart")}
              className="flex items-center gap-3 text-left px-4 py-3 rounded-lg text-[#f4ead0] hover:text-[#f2b84b] hover:bg-[#14211d]"
            >
              <ShoppingCartOutlined />
              Shopping Cart ({cartCount})
            </button>

            {user ? (
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex items-center gap-3 text-left px-4 py-3 rounded-lg text-[#f4ead0] hover:text-[#f2b84b] hover:bg-[#14211d]"
              >
                <LogoutOutlined />
                {loggingOut ? "Logging out..." : "Logout"}
              </button>
            ) : (
              <>
                <button
                  onClick={() => handleNavigation("/login")}
                  className="text-left px-4 py-3 rounded-lg text-[#f4ead0] hover:text-[#f2b84b] hover:bg-[#14211d]"
                >
                  Login
                </button>

                <button
                  onClick={() => handleNavigation("/register")}
                  className="text-left px-4 py-3 rounded-lg text-[#f4ead0] hover:text-[#f2b84b] hover:bg-[#14211d]"
                >
                  Register
                </button>
              </>
            )}

            <button
              onClick={() => scrollToSection("review")}
              className="mt-3 flex items-center justify-center gap-3 w-full px-5 py-4 rounded-full bg-[#f2b84b] text-[#0a1311] font-black hover:bg-[#f4ead0] transition-colors"
            >
              Get a Free Procurement Review
              <ArrowRightOutlined />
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default BrandHeader;