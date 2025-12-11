import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductsByBrand } from "../redux/product/productSlice";

const ProductCard = () => {
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
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
      {/* Brand Title */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          {formattedBrand} Products
        </h2>
        <p className="text-sm text-gray-500">
          Discover premium products by {formattedBrand}
        </p>
      </div>

      {/* Loading / Error / No Data */}
      {loading ? (
        <p className="text-center text-lg text-gray-600">Loading products...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : brandProducts.length === 0 ? (
        <p className="text-center text-gray-500 mt-12">
          No products found for {formattedBrand}.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {brandProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow hover:shadow-md overflow-hidden transition transform hover:-translate-y-1"
            >
              <img
                src={product.productImage}
                alt={product.name}
                className="w-full h-60 object-contain bg-gray-100 p-4"
              />
              <div className="px-4 pb-5 pt-2 text-center">
                <h3 className="text-base font-semibold text-gray-800 line-clamp-1">
                  {product.name}
                </h3>

                {/* Description */}
                {product.description && (
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {product.description}
                  </p>
                )}

                {/* Prices */}
                <div className="mt-3 mb-2">
                  <p className="text-blue-700 font-bold text-lg">
                    ${Number(product.listPrice).toLocaleString()}
                  </p>
                  {product.discountPrice && (
                    <p className="text-sm text-gray-400 line-through">
                      ${Number(product.discountPrice).toLocaleString()}
                    </p>
                  )}
                </div>
                {/* <Link className="inline-block mt-2 bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition">
                  View Details
                </Link> */}
                <Link
  to={`/product/${product.slug}`}
  className="inline-block mt-2 bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition"
>
  View Details
</Link>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductCard;
