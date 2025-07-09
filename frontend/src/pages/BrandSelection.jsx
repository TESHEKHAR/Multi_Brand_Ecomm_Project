import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { getBrands } from "../redux/brand/brandSlice";

const BrandSelection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { brands, loading, error } = useSelector((state) => state.brand);

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  const handleBrandClick = (brandName) => {
    navigate(`/brand/${brandName}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="flex items-center justify-center px-4 py-6 md:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl w-full">
          {loading ? (
            <p className="col-span-full text-center text-lg">Loading...</p>
          ) : error ? (
            <p className="col-span-full text-red-500 text-center">{error}</p>
          ) : brands.length === 0 ? (
            <p className="col-span-full text-center">No brands found.</p>
          ) : (
            brands.map((brand) => (
              <div
                key={brand._id}
                onClick={() => handleBrandClick(brand.name)}
                className="cursor-pointer bg-white p-4 rounded-lg shadow hover:shadow-md transition flex flex-col items-center text-center"
              >
                {brand.brandImage && (
                  <img
                    src={brand.brandImage}
                    alt={brand.name}
                    className="h-16 md:h-20 object-contain mb-2"
                  />
                )}
                <p className="text-xs sm:text-sm font-medium text-gray-700 truncate w-full">
                  {brand.name}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BrandSelection;
