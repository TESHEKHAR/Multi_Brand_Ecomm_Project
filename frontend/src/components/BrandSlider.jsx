import React, { useEffect } from "react";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../redux/brand/brandSlice";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/* ---------- shared section shell ---------- */
const Shell = ({ children }) => (
  <section
    id="brands"
    aria-labelledby="brands-h"
    className="relative overflow-hidden bg-[#0a1311] px-[6vw] py-[80px] text-[#f4ead0]
      before:pointer-events-none before:absolute before:left-1/2 before:top-0 before:h-[360px] before:w-[760px] before:-translate-x-1/2 before:bg-[radial-gradient(ellipse,rgba(242,184,75,.10),transparent_70%)] before:content-['']"
  >
    <div className="relative z-10 mx-auto max-w-6xl">
      <div className="mb-12 text-center">
        <Reveal
          as="p"
          className="text-xs font-bold uppercase tracking-[.3em] text-[#f2b84b]"
        >
          Trusted partners
        </Reveal>

        <Reveal
          as="h2"
          delay={0.1}
          className="mt-3 text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.1] tracking-[-.02em]"
        >
          <span id="brands-h">
            Our{" "}
            <span className="bg-[linear-gradient(100deg,#f2b84b,#ffe3a0,#f2b84b)] bg-clip-text text-transparent">
              Brands
            </span>
          </span>
        </Reveal>

        <Reveal
          as="p"
          delay={0.2}
          className="mx-auto mt-4 max-w-[520px] text-base leading-relaxed text-[#b9c2b6]"
        >
          We work with trusted brands to bring you quality products at better
          prices.
        </Reveal>
      </div>

      {children}
    </div>
  </section>
);

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

  /* ---------- loading ---------- */
  if (loading)
    return (
      <Shell>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-28 animate-pulse rounded-2xl border border-white/10 bg-white/[.06]"
            />
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-[#b9c2b6]">
          Loading brands...
        </p>
      </Shell>
    );

  /* ---------- error ---------- */
  if (error)
    return (
      <Shell>
        <div className="mx-auto max-w-md rounded-2xl border border-[#ff6b6b]/40 bg-[#ff6b6b]/10 px-6 py-8 text-center">
          <p className="font-bold text-[#ff8a8a]">Something went wrong</p>
          <p className="mt-1 text-sm text-[#f4ead0]/80">
            {typeof error === "string" ? error : "Failed to load brands."}
          </p>
        </div>
      </Shell>
    );

  /* ---------- empty ---------- */
  if (brands.length === 0)
    return (
      <Shell>
        <div className="mx-auto max-w-md rounded-2xl border border-dashed border-white/15 bg-white/[.03] px-6 py-12 text-center">
          <p className="text-lg font-bold">No brands found</p>
          <p className="mt-1 text-sm text-[#b9c2b6]">
            Brands will appear here once they are added.
          </p>
        </div>
      </Shell>
    );

  /* ---------- slider ---------- */
  return (
    <Shell>
      <div className="relative">
        {/* edge fades */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0a1311] to-transparent sm:w-24"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0a1311] to-transparent sm:w-24"
        />

        <Slider {...settings}>
          {brands.map((brand) => (
            <div key={brand._id} className="px-2.5 py-3 sm:px-3">
              <Link
                to={`/brand/${brand.name}`}
                title={brand.name}
                className="group flex h-28 w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(160deg,#ffffff,#eef1ec)] p-4 shadow-[0_10px_28px_rgba(0,0,0,.4)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#f2b84b] hover:shadow-[0_16px_40px_rgba(0,0,0,.55),0_0_28px_rgba(242,184,75,.28)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f2b84b]"
              >
                {brand.brandImage ? (
                  <img
                    src={brand.brandImage}
                    alt={brand.name}
                    loading="lazy"
                    className="h-full w-full object-contain opacity-80 grayscale transition-all duration-300 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
                  />
                ) : (
                  <span className="text-center text-sm font-extrabold uppercase tracking-wide text-[#0a1311]/70 group-hover:text-[#0a1311]">
                    {brand.name}
                  </span>
                )}
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </Shell>
  );
};

export default BrandSlider;