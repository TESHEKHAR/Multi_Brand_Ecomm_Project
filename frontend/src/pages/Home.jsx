import React from 'react';
import BrandHeader from '../components/BrandHeader';
import BrandSlider from '../components/BrandSlider';
import Footer from '../components/Footer';
import HomeProducts from '../components/HomeProducts';
import Hero from '../components/Hero';
import WhyChoose from '../components/WhyChoose';
import Network from '../components/Network';
import Reveal from '../components/Reveal';
import Difference from '../components/Difference';
import Features from '../components/Features';
import LowRisk from '../components/LowRisk';

const Home = () => {
  return (
    <>
      <BrandHeader/>

      {/* HERO SECTION */}
      {/* <div className="relative w-full overflow-hidden pt-16 md:pt-0">
        <div className="relative w-full overflow-hidden pt-[56.25%] md:pt-[100vh]">
          <video
            src={videoBg}
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
      </div> */}
      <Hero/>
      <WhyChoose/>
      <Network/>
      <Reveal/>
      <Difference/>
      <LowRisk/>
      <Features/>
      {/* <HomePageContent /> */}
      <HomeProducts />
      <BrandSlider />
      <Footer />
    </>
  );
};

export default Home;
