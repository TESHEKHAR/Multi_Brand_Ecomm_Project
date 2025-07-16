import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../redux/brand/brandSlice";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";

const BrandHeader = () => {
  const { brandName } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const { brands } = useSelector((state) => state.brand);

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  const selectedBrand = brands.find((brand) => brand.name === brandName);

  const menuItems = [
    { label: "Home", link: `/brand/${brandName}` },
    { label: "Products", link: `/brand/${brandName}/products` },
    { label: "About", link: `/brand/${brandName}/about` },
  ];

  return (
    <header className="bg-white shadow-md px-4 py-3">
      <div className="flex justify-between items-center">
        {/* Brand Logo */}
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer flex items-center gap-2"
        >
          {selectedBrand?.brandImage && (
            <img
              src={selectedBrand.brandImage}
              alt={`${brandName} Logo`}
              className="h-10 w-auto object-contain"
            />
          )}
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="text-gray-700 font-medium hover:text-blue-600 transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <CloseOutlined style={{ fontSize: 20 }} /> : <MenuOutlined style={{ fontSize: 20 }} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden mt-3 flex flex-col gap-3 border-t pt-3">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="text-gray-700 font-medium hover:text-blue-600"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default BrandHeader;
