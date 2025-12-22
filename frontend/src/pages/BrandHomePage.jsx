import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../redux/brand/brandSlice";
import BrandHeader from "../components/BrandHeader";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

const BrandHomePage = () => {
  const { brandName } = useParams();
  const dispatch = useDispatch();
  const { brands } = useSelector((state) => state.brand);

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  const currentBrand = brands.find((b) => b.name === brandName);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* FIXED NAVBAR */}
      <BrandHeader />

      {/* ✅ SPACER FOR FIXED NAVBAR (VERY IMPORTANT) */}
      <div className="h-16 md:h-16"></div>

      {/* BRAND HEADING */}
      {currentBrand && (
        <section className="relative bg-gradient-to-r from-slate-900 to-blue-900 text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16 text-center relative z-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
              {currentBrand.name}
            </h1>
          </div>

          {/* Background shapes */}
          <div className="absolute -top-24 -left-24 w-56 md:w-72 h-56 md:h-72 bg-purple-500 rounded-full opacity-30"></div>
          <div className="absolute -bottom-24 -right-24 w-56 md:w-72 h-56 md:h-72 bg-pink-500 rounded-full opacity-30"></div>
        </section>
      )}

      {/* PRODUCTS */}
      <div className="py-10 px-4">
        <ProductCard />
      </div>

      <Footer />
    </div>
  );
};

export default BrandHomePage;
