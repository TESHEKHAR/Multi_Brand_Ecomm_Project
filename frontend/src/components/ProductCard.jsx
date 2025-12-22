import React, { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductsByBrand } from "../redux/product/productSlice";

const ProductCard = () => {
  const { brandName } = useParams();
  const dispatch = useDispatch();

  const { brandProducts = [], loading, error } = useSelector(
    (state) => state.product
  );

  const isLoggedIn = Boolean(JSON.parse(localStorage.getItem("user")));

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Search
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (brandName) dispatch(getProductsByBrand(brandName));
  }, [brandName, dispatch]);

  /* 🆕 Latest products first (assuming createdAt exists) */
  const sortedProducts = useMemo(() => {
    return [...brandProducts].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [brandProducts]);

  /* 🔍 Search filter */
  const filteredProducts = sortedProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination calculation
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <>
          {/* 🔍 Search with Label */}
          <div className="mb-6 flex justify-end">
            <div className="w-full sm:w-72">
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Search Products
              </label>
              <input
                type="text"
                placeholder="Search by product name..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="border rounded px-4 py-2 w-full"
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <div key={product._id} className="bg-white rounded-xl shadow">
                  <img
                    src={product.productImage}
                    alt={product.name}
                    className="h-60 w-full object-contain bg-gray-100 p-4"
                  />

                  <div className="text-center p-4">
                    <h3 className="font-semibold text-sm sm:text-base">
                      {product.name}
                    </h3>

                    <div className="mt-2">
                      <p className="text-blue-700 font-bold text-sm sm:text-base">
                        $
                        {Number(
                          isLoggedIn
                            ? product.discountPrice
                            : product.listPrice
                        ).toLocaleString()}
                      </p>

                      {isLoggedIn && product.discountPrice && (
                        <p className="text-xs sm:text-sm text-gray-400 line-through">
                          ${Number(product.listPrice).toLocaleString()}
                        </p>
                      )}
                    </div>

                    <Link
                      to={`/product/${product.slug}`}
                      className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded text-xs sm:text-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No products found
              </p>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-end mt-6 gap-2 flex-wrap items-center">
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.max(prev - 1, 1))
                }
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded ${
                  currentPage === 1
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                Previous
              </button>

              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === idx + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(prev + 1, totalPages)
                  )
                }
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded ${
                  currentPage === totalPages
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductCard;
