import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../redux/brand/brandSlice";
import BrandHeader from "../components/BrandHeader";
import BrandBanner from "../components/BrandBanner";
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
      {/* Header */}
      <div className="relative z-10">
        <BrandHeader logo={currentBrand?.brandImage} brandName={brandName} />
      </div>

      {/* Banner (no left/right padding) */}
      <div>
        <BrandBanner />
      </div>

      {/* Page content */}
      <div className="text-center py-10 px-4 text-gray-600 text-lg">
        <ProductCard /> 
      </div>
      <Footer />
    </div>
  );
};

export default BrandHomePage;
