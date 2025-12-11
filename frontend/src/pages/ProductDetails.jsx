import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductBySlug } from "../redux/product/productSlice";
import BrandHeader from "../components/BrandHeader";
import { addToCart } from "../redux/cart/cartSlice";

const ProductDetails = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const { singleProduct, loading, error } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (slug) {
      dispatch(getProductBySlug(slug));
    }
  }, [slug, dispatch]);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: singleProduct._id,
        name: singleProduct.name,
        price: singleProduct.discountPrice || singleProduct.listPrice,
        quantity: 1,
        image: singleProduct.productImage,
        brand: singleProduct.brand,
      })
    );
  };

  if (loading) {
    return <p className="text-center text-lg mt-10">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  if (!singleProduct) {
    return (
      <p className="text-center text-gray-500 mt-10">Product not found.</p>
    );
  }

  const {
    name,
    description,
    productImage,
    listPrice,
    discountPrice,
    stock,
    weight,
    weightUnit,
    sku,
    // ratings,
    // reviews,
    brand,
  } = singleProduct;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ Brand Header */}
      <div className="relative z-10">
        <BrandHeader logo={brand?.brandImage} brandName={brand?.name} />
      </div>

      {/* Product Content */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Product Image */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <img
              src={productImage}
              alt={name}
              className="w-full h-[400px] object-contain p-6 bg-gray-100"
            />
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{name}</h1>
            <p className="text-sm text-gray-500 mb-4">{description}</p>

            <div className="flex items-center gap-4 mb-4">
              <p className="text-2xl font-bold text-blue-700">
                ${Number(listPrice).toLocaleString()}
              </p>
              {discountPrice && (
                <p className="text-sm text-gray-400 line-through">
                  ${Number(discountPrice).toLocaleString()}
                </p>
              )}
            </div>

            <p className="text-sm mb-2">
              <strong>SKU:</strong> {sku}
            </p>
            {/* <p className="text-sm mb-2"><strong>Weight:</strong> {weight} kg</p> */}
            <p className="text-sm mb-2">
              <strong>Weight:</strong> {weight} {weightUnit || "kg"}
            </p>

            <p className="text-sm mb-2">
              <strong>Stock:</strong> {stock > 0 ? stock : "Out of stock"}
            </p>

            {/* <div className="mt-4">
              <p className="text-sm text-gray-600">
                <strong>Ratings:</strong> {ratings}/5 | <strong>Reviews:</strong> {reviews}
              </p>
            </div> */}

            <button
              disabled={stock === 0}
              onClick={handleAddToCart}
              className={`mt-6 px-6 py-3 text-white rounded ${
                stock > 0
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              } transition`}
            >
              {stock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
