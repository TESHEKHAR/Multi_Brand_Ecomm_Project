import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../redux/brand/brandSlice";
import { Link } from "react-router-dom";

const Footer = () => {
  const dispatch = useDispatch();
  const { brands, loading, error } = useSelector((state) => state.brand);

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  // Limit to 6 brands (2 columns x 3 rows)
  const visibleBrands = brands.slice(0, 6);

  // Split into 2 columns
  const brandColumns = [visibleBrands.slice(0, 3), visibleBrands.slice(3, 6)];

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Section 1: Brands */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-6">Our Brands</h3>

          {loading && <div className="text-gray-400 py-6">Loading brands...</div>}
          {error && <div className="text-red-500 py-6">{error}</div>}

          {visibleBrands.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {brandColumns.map((column, colIndex) => (
                <ul key={colIndex} className="flex flex-col gap-2">
                  {column.map((brand) => (
                    <li key={brand._id}>
                      <Link
                        to={`/brand/${brand.name}`}
                        className="text-gray-400 hover:text-white transition"
                      >
                        {brand.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          )}
        </div>

        {/* Section 2: Contact Info */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-6">Contact Us</h3>
          <p className="text-gray-400 mb-2">
            7800 Woodley Ave<br />
            Van Nuys, California 91406
          </p>
          <a
            href="mailto:Sales@alliedpurchasingnetwork.com"
            className="text-gray-400 hover:text-white transition"
          >
            Sales@alliedpurchasingnetwork.com
          </a>
        </div>

        {/* Section 3: Extra Info */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-6">Company Info</h3>
          <ul className="flex flex-col gap-2">
            <li>
              <Link to="/about" className="text-gray-400 hover:text-white transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/terms" className="text-gray-400 hover:text-white transition">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="text-gray-400 hover:text-white transition">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-12 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Allied Purchasing Network. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
