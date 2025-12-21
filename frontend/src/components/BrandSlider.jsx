import React, { useEffect } from "react";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../redux/brand/brandSlice";
import { Link } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BrandSlider = () => {
  const dispatch = useDispatch();
  const { brands, loading, error } = useSelector((state) => state.brand);

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

  if (loading) return <div className="py-12 text-center">Loading brands...</div>;
  if (error) return <div className="py-12 text-center text-red-500">{error}</div>;
  if (brands.length === 0) return <div className="py-12 text-center">No brands found.</div>;

  return (
    <div className="py-12 bg-gray-50">
      <h2 className="text-3xl font-semibold text-center mb-8">Our Brands</h2>

      <div className="max-w-6xl mx-auto">
        <Slider {...settings}>
          {brands.map((brand) => (
            <div key={brand._id} className="px-4">
              {brand.brandImage && (
                <Link to={`/brand/${brand.name}`}>
                  <img
                    src={brand.brandImage}
                    alt={brand.name}
                    className="h-20 mx-auto object-contain opacity-80 hover:opacity-100 transition cursor-pointer"
                  />
                </Link>
              )}
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BrandSlider;
