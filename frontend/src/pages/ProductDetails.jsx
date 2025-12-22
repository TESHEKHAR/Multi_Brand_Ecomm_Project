import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductBySlug } from "../redux/product/productSlice";
import BrandHeader from "../components/BrandHeader";
import { addToCart } from "../redux/cart/cartSlice";
import Footer from "../components/Footer";

const ProductDetails = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const { singleProduct, loading, error } = useSelector(
    (state) => state.product
  );

  const isLoggedIn = Boolean(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    if (slug) dispatch(getProductBySlug(slug));
  }, [slug, dispatch]);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: singleProduct._id,
        name: singleProduct.name,
        listPrice: singleProduct.listPrice,
        discountPrice: singleProduct.discountPrice,
        price: isLoggedIn
          ? singleProduct.discountPrice
          : singleProduct.listPrice,
        quantity: 1,
        image: singleProduct.productImage,
        brand: singleProduct.brand,
      })
    );
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-20">{error}</p>;
  if (!singleProduct) return null;

  const {
    name,
    productImage,
    listPrice,
    discountPrice,
    stock,
    weight,
    weightUnit,
    sku,
  } = singleProduct;

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* NAVBAR */}
      <BrandHeader />

      {/* HEADING SECTION (NO EXTRA GAP) */}
      <section className="relative bg-gradient-to-r from-slate-900 to-blue-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            {name}
          </h1>
        </div>

        {/* Background shapes */}
        <div className="absolute -top-24 -left-24 w-56 md:w-80 h-56 md:h-80 bg-purple-500 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-24 -right-24 w-56 md:w-80 h-56 md:h-80 bg-pink-500 rounded-full opacity-30 animate-pulse"></div>
      </section>

      {/* PRODUCT DETAILS */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <img
            src={productImage}
            alt={name}
            className="bg-gray-100 p-6 h-[400px] w-full object-contain rounded shadow"
          />

          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{name}</h2>

            {/* PRICE */}
            <div className="flex items-center gap-4 mb-4">
              <p className="text-2xl font-bold text-blue-700">
                ${Number(isLoggedIn ? discountPrice : listPrice).toLocaleString()}
              </p>
              {isLoggedIn && discountPrice && (
                <p className="text-sm text-gray-400 line-through">
                  ${Number(listPrice).toLocaleString()}
                </p>
              )}
            </div>

            {/* INFO */}
            <p className="text-sm mb-1"><strong>SKU:</strong> {sku}</p>
            <p className="text-sm mb-1">
              <strong>Weight:</strong> {weight} {weightUnit}
            </p>
            <p className="text-sm mb-4">
              <strong>Stock:</strong> {stock > 0 ? stock : "Out of stock"}
            </p>

            <button
              disabled={stock === 0}
              onClick={handleAddToCart}
              className="mt-6 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {stock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetails;
