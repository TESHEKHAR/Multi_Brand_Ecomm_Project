import React, { useEffect } from "react";
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

  useEffect(() => {
    if (brandName) dispatch(getProductsByBrand(brandName));
  }, [brandName, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {brandProducts.map((product) => (
            <div key={product._id} className="bg-white rounded-xl shadow">
              <img
                src={product.productImage}
                alt={product.name}
                className="h-60 w-full object-contain bg-gray-100 p-4"
              />

              <div className="text-center p-4">
                <h3 className="font-semibold">{product.name}</h3>

                {/* PRICE LOGIC */}
                <div className="mt-2">
                  <p className="text-blue-700 font-bold">
                    $
                    {Number(
                      isLoggedIn
                        ? product.discountPrice
                        : product.listPrice
                    ).toLocaleString()}
                  </p>

                  {isLoggedIn && product.discountPrice && (
                    <p className="text-sm text-gray-400 line-through">
                      ${Number(product.listPrice).toLocaleString()}
                    </p>
                  )}
                </div>

                <Link
                  to={`/product/${product.slug}`}
                  className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded"
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
