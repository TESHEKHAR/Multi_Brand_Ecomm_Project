import React from 'react';
import BrandHeader from '../components/BrandHeader';
import logoVideo from '../assets/videos/allied_logo.mp4';
import videoBg from '../assets/videos/allied.mp4';
import HomePageContent from '../components/HomePageContent';
import BrandSlider from '../components/BrandSlider';
import Footer from '../components/Footer';
import HomeProducts from '../components/HomeProducts';

const Home = () => {
  return (
    <>
      <BrandHeader logo={logoVideo} />

      {/* HERO SECTION */}
      <div className="relative w-full overflow-hidden pt-16 md:pt-0">
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
      </div>

      <HomePageContent />
      <HomeProducts />
      <BrandSlider />
      <Footer />
    </>
  );
};

export default Home;
