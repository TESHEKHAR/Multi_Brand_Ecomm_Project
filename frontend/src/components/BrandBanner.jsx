import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BrandBanner = () => {
  const banners = [
    "https://sandiaplastics.com/wp-content/uploads/2023/12/SandiaWebsiteBanners-04-e1701724115491.png",
    "https://sandiaplastics.com/wp-content/uploads/2023/12/SandiaWebsiteBanners-03-e1701724084886.png",
    "https://sandiaplastics.com/wp-content/uploads/2023/12/SandiaWebsiteBanners-01-e1701724009476.png"
  ];

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="w-full mb-4">
      <Slider {...settings}>
        {banners.map((url, index) => (
          <div key={index}>
            <img
              src={url}
              alt={`Nike Banner ${index + 1}`}
              className="w-full h-[220px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BrandBanner;
