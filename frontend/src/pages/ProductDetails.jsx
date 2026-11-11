
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

  if (loading)
    return (
      <div className="min-h-screen bg-[#0a1311]">
        <BrandHeader />
        <div className="pt-40 pb-20 flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-[#2de2c8] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#f4ead0] mt-5 text-lg">
            Loading product details...
          </p>
        </div>
        <Footer />
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-[#0a1311]">
        <BrandHeader />
        <div className="pt-40 pb-20 text-center px-4">
          <p className="text-red-400 text-lg">{error}</p>
        </div>
        <Footer />
      </div>
    );

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
  } = singleProduct;

  return (
    <div className="min-h-screen bg-[#0a1311] text-[#f4ead0]">

      {/* NAVBAR */}
      <BrandHeader />

      {/* PRODUCT HERO SECTION */}
      <section className="relative overflow-hidden pt-32 sm:pt-36 pb-14 md:pb-20 bg-[#0a1311]">

        {/* Background Effects */}
        <div className="absolute top-10 -left-32 w-80 h-80 bg-[#2de2c8]/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#f2b84b]/10 rounded-full blur-[120px]"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8">

          <div className="text-center max-w-3xl mx-auto">

            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#2de2c8]/30 bg-[#14211d] text-[#2de2c8] text-xs md:text-sm font-semibold tracking-widest uppercase mb-5">
              <span className="w-2 h-2 rounded-full bg-[#2de2c8] animate-pulse"></span>
              Product Details
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-[#f4ead0]">
              {name}
            </h1>

            <div className="w-20 h-1 bg-gradient-to-r from-[#2de2c8] to-[#f2b84b] mx-auto mt-6 rounded-full"></div>

            <p className="text-gray-400 mt-5 text-sm md:text-base">
              Explore product specifications, pricing and availability.
            </p>

          </div>
        </div>
      </section>

      {/* PRODUCT DETAILS SECTION */}
      <section className="relative bg-[#14211d] py-12 md:py-20">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* PRODUCT IMAGE */}
            <div className="relative">

              <div className="absolute -inset-1 bg-gradient-to-br from-[#2de2c8]/30 via-transparent to-[#f2b84b]/30 rounded-3xl blur-sm"></div>

              <div className="relative bg-[#f4ead0] rounded-3xl p-5 sm:p-8 md:p-12 border border-white/10 overflow-hidden">

                <div className="absolute top-5 left-5 z-10">
                  <span className="bg-[#0a1311] text-[#2de2c8] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
                    APN Product
                  </span>
                </div>

                <div className="flex items-center justify-center min-h-[320px] sm:min-h-[420px]">
                  <img
                    src={productImage}
                    alt={name}
                    className="w-full h-[320px] sm:h-[420px] object-contain transition-transform duration-500 hover:scale-105"
                  />
                </div>

              </div>

              {/* Image Bottom Info */}
              <div className="grid grid-cols-2 gap-4 mt-5">

                <div className="bg-[#0a1311] border border-white/10 rounded-2xl p-4">
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">
                    Product SKU
                  </p>
                  <p className="text-[#2de2c8] font-semibold text-sm break-all">
                    {sku || "N/A"}
                  </p>
                </div>

                <div className="bg-[#0a1311] border border-white/10 rounded-2xl p-4">
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">
                    Availability
                  </p>
                  <p className={`font-semibold text-sm ${
                    stock > 0 ? "text-[#2de2c8]" : "text-red-400"
                  }`}>
                    {stock > 0 ? "In Stock" : "Out of Stock"}
                  </p>
                </div>

              </div>
            </div>

            {/* PRODUCT INFORMATION */}
            <div className="pt-2">

              <span className="text-[#2de2c8] text-sm font-bold uppercase tracking-[3px]">
                Product Information
              </span>

              <h2 className="text-3xl md:text-4xl font-bold text-[#f4ead0] mt-3 leading-tight">
                {name}
              </h2>

              <p className="text-gray-400 text-sm mt-4 leading-7">
                Quality products and purchasing solutions for your business.
              </p>

              {/* PRICE CARD */}
              <div className="mt-8 bg-[#0a1311] border border-white/10 rounded-2xl p-6">

                <p className="text-gray-400 text-xs uppercase tracking-widest mb-3">
                  {isLoggedIn ? "Your Member Price" : "Product Price"}
                </p>

                <div className="flex flex-wrap items-center gap-4">

                  <span className="text-3xl md:text-4xl font-extrabold text-[#2de2c8]">
                    ${Number(
                      isLoggedIn ? discountPrice : listPrice
                    ).toLocaleString()}
                  </span>

                  {isLoggedIn && discountPrice > 0 && (
                    <span className="text-lg text-gray-500 line-through">
                      ${Number(listPrice).toLocaleString()}
                    </span>
                  )}

                </div>

                {!isLoggedIn && (
                  <p className="text-gray-400 text-xs mt-3">
                    Login to access your member pricing.
                  </p>
                )}

                {isLoggedIn && discountPrice > 0 && (
                  <p className="text-[#f2b84b] text-sm mt-3 font-medium">
                    Exclusive member pricing available
                  </p>
                )}

              </div>

              {/* DESCRIPTION */}
              <div className="mt-8">

                <h3 className="text-xl font-bold text-[#f4ead0] flex items-center gap-3">
                  <span className="w-1 h-7 bg-[#2de2c8] rounded-full"></span>
                  Product Description
                </h3>

                <p className="text-gray-400 text-sm md:text-base leading-8 mt-4 whitespace-pre-line">
                  {description || "No description available"}
                </p>

              </div>

              {/* PRODUCT SPECIFICATIONS */}
              <div className="mt-8">

                <h3 className="text-xl font-bold text-[#f4ead0] mb-5 flex items-center gap-3">
                  <span className="w-1 h-7 bg-[#f2b84b] rounded-full"></span>
                  Product Specifications
                </h3>

                <div className="border border-white/10 rounded-2xl overflow-hidden">

                  <div className="flex items-center justify-between gap-4 px-5 py-4 bg-[#0a1311]">
                    <span className="text-gray-400 text-sm">SKU</span>
                    <span className="text-[#f4ead0] text-sm font-semibold text-right break-all">
                      {sku || "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4 px-5 py-4 bg-[#14211d]">
                    <span className="text-gray-400 text-sm">Weight</span>
                    <span className="text-[#f4ead0] text-sm font-semibold">
                      {weight || "N/A"} {weightUnit || ""}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4 px-5 py-4 bg-[#0a1311]">
                    <span className="text-gray-400 text-sm">Stock Status</span>
                    <span className={`text-sm font-semibold ${
                      stock > 0 ? "text-[#2de2c8]" : "text-red-400"
                    }`}>
                      {stock > 0 ? `${stock} Available` : "Out of Stock"}
                    </span>
                  </div>

                </div>

              </div>

              {/* ADD TO CART */}
              <div className="mt-9">

                <button
                  disabled={stock === 0}
                  onClick={handleAddToCart}
                  className="group w-full sm:w-auto min-w-[220px] flex items-center justify-center gap-3 bg-[#2de2c8] text-[#0a1311] px-8 py-4 rounded-xl font-extrabold text-sm uppercase tracking-wider transition-all duration-300 hover:bg-[#f2b84b] hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(45,226,200,0.15)] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:bg-[#2de2c8]"
                >
                  {stock > 0 ? (
                    <>
                      Add to Cart
                      <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </>
                  ) : (
                    "Out of Stock"
                  )}
                </button>

                <p className="text-gray-500 text-xs mt-4">
                  Secure ordering • Business purchasing solutions
                </p>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE APN */}
      <section className="bg-[#0a1311] py-14 md:py-20">

        <div className="max-w-7xl mx-auto px-5 md:px-8">

          <div className="text-center mb-12">
            <span className="text-[#2de2c8] text-xs font-bold uppercase tracking-[3px]">
              Allied Purchasing Network
            </span>

            <h2 className="text-2xl md:text-4xl font-bold text-[#f4ead0] mt-3">
              Smarter Purchasing Starts Here
            </h2>

            <p className="text-gray-400 text-sm mt-4 max-w-2xl mx-auto leading-7">
              Discover purchasing solutions designed to help businesses
              simplify procurement and make smarter purchasing decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

            <div className="bg-[#14211d] border border-white/10 rounded-2xl p-7 text-center hover:border-[#2de2c8]/50 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-[#2de2c8]/10 flex items-center justify-center mx-auto mb-5">
                <span className="text-[#2de2c8] text-2xl">✓</span>
              </div>
              <h3 className="text-[#f4ead0] font-bold text-lg">
                Quality Products
              </h3>
              <p className="text-gray-400 text-sm mt-3 leading-6">
                Explore products selected for business purchasing needs.
              </p>
            </div>

            <div className="bg-[#14211d] border border-white/10 rounded-2xl p-7 text-center hover:border-[#f2b84b]/50 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-[#f2b84b]/10 flex items-center justify-center mx-auto mb-5">
                <span className="text-[#f2b84b] text-2xl">◇</span>
              </div>
              <h3 className="text-[#f4ead0] font-bold text-lg">
                Smart Procurement
              </h3>
              <p className="text-gray-400 text-sm mt-3 leading-6">
                Make informed purchasing decisions for your organization.
              </p>
            </div>

            <div className="bg-[#14211d] border border-white/10 rounded-2xl p-7 text-center hover:border-[#2de2c8]/50 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-[#2de2c8]/10 flex items-center justify-center mx-auto mb-5">
                <span className="text-[#2de2c8] text-2xl">↗</span>
              </div>
              <h3 className="text-[#f4ead0] font-bold text-lg">
                Business Focused
              </h3>
              <p className="text-gray-400 text-sm mt-3 leading-6">
                Purchasing solutions designed around business requirements.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />

    </div>
  );
};

export default ProductDetails;