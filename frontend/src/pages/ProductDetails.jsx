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
    // dispatch(
    //   addToCart({
    //     productId: singleProduct._id,
    //     name: singleProduct.name,
    //     price: isLoggedIn
    //       ? singleProduct.discountPrice
    //       : singleProduct.listPrice,
    //     quantity: 1,
    //     image: singleProduct.productImage,
    //     brand: singleProduct.brand,
    //   })
    // );
    dispatch(
      addToCart({
        productId: singleProduct._id,
        name: singleProduct.name,
    
        // ✅ BOTH PRICES MUST BE STORED
        listPrice: singleProduct.listPrice,
        discountPrice: singleProduct.discountPrice,
    
        // 👇 guest vs login
        price: isLoggedIn
          ? singleProduct.discountPrice
          : singleProduct.listPrice,
    
        quantity: 1,
        image: singleProduct.productImage,
        brand: singleProduct.brand,
      })
    );
    
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!singleProduct) return null;

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
    brand,
  } = singleProduct;

  return (
    <div className="min-h-screen bg-gray-50">
      <BrandHeader logo={brand?.brandImage} brandName={brand?.name} />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-10">
          <img
            src={productImage}
            alt={name}
            className="bg-gray-100 p-6 h-[400px] w-full object-contain rounded"
          />

          <div>
            <h1 className="text-3xl font-bold mb-3">{name}</h1>
            <p className="text-sm text-gray-500 mb-4">{description}</p>

            {/* PRICE LOGIC */}
            <div className="flex items-center gap-4 mb-4">
              <p className="text-2xl font-bold text-blue-700">
                $
                {Number(
                  isLoggedIn ? discountPrice : listPrice
                ).toLocaleString()}
              </p>

              {isLoggedIn && discountPrice && (
                <p className="text-sm text-gray-400 line-through">
                  ${Number(listPrice).toLocaleString()}
                </p>
              )}
            </div>

            <p className="text-sm"><strong>SKU:</strong> {sku}</p>
            <p className="text-sm">
              <strong>Weight:</strong> {weight} {weightUnit}
            </p>
            <p className="text-sm">
              <strong>Stock:</strong> {stock > 0 ? stock : "Out of stock"}
            </p>

            <button
              disabled={stock === 0}
              onClick={handleAddToCart}
              className="mt-6 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
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
