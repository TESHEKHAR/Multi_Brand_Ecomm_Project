import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { getProductDetails } from "../redux/product/productSlice";

const ProductDetails = () => {
  const { productId } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const productFromState = location.state?.product;
  const { productDetails, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    if (!productFromState && productId) {
      dispatch(getProductDetails(productId));
    }
  }, [dispatch, productId, productFromState]);

  const product = productFromState || productDetails;

  if (loading) return <p className="text-center mt-10">Loading product...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!product) return <p className="text-center mt-10 text-gray-500">Product not found.</p>;

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Product Image Top */}
        <div className="mb-10">
          <img
            src={product.productImage}
            alt={product.name}
            className="w-full max-h-[500px] object-contain bg-gray-50 border rounded-xl shadow"
          />
        </div>

        {/* Product Info */}
        <div className="bg-blue-50 p-6 rounded-xl shadow-sm">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">{product.name}</h1>

          {product.description && (
            <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>
          )}

          <div className="flex items-center gap-4 mb-6">
            <p className="text-2xl font-bold text-green-700">
              ${Number(product.listPrice).toFixed(2)}
            </p>
            {product.discountPrice && (
              <p className="text-gray-400 line-through text-lg">
                ${Number(product.discountPrice).toFixed(2)}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
