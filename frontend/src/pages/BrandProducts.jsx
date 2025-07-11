import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { getProductsByBrand } from "../redux/product/productSlice";

const BrandProducts = () => {
  const { brandName } = useParams();
  const dispatch = useDispatch();

  const {
    brandProducts = [],
    loading,
    error,
  } = useSelector((state) => state.product);

  const formattedBrand = brandName.charAt(0).toUpperCase() + brandName.slice(1);

  useEffect(() => {
    if (brandName) {
      dispatch(getProductsByBrand(brandName));
    }
  }, [brandName, dispatch]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="py-10 px-4 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-blue-700">
            {formattedBrand} Products
          </h2>
          <Link
            to="/dashboard"
            className="text-sm text-blue-600 hover:underline"
          >
            ← Back to Brands
          </Link>
        </div>

        {/* Loading / Error / No Data */}
        {loading ? (
          <p className="text-center text-lg">Loading products...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : brandProducts.length === 0 ? (
          <p className="text-center text-gray-500 mt-12">
            No products found for {formattedBrand}.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {brandProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
              >
                <img
                  src={product.productImage}
                  alt={product.name}
                  className="w-full h-60 object-contain bg-gray-100"
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {product.name}
                  </h3>

                  {/* Description */}
                  {product.description && (
                    <p className="text-sm text-gray-500 mb-2">
                      {product.description}
                    </p>
                  )}

                  {/* Prices */}
                  <div className="mb-4">
                    <p className="text-blue-700 font-semibold text-base">
                    ${Number(product.listPrice).toLocaleString()}
                    </p>

                    {product.discountPrice && (
                      <p className="text-sm text-gray-400 line-through">
                        ${Number(product.discountPrice).toFixed(2)}
                      </p>
                    )}
                  </div>

                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandProducts;
