import React from "react";
import { useNavigate } from "react-router-dom";
import BrandHeader from "../components/BrandHeader";
import Footer from "../components/Footer";
import ServicesHero from "../components/services/ServicesHero";
import ServicesList from "../components/services/ServicesList";
import ServicesProcess from "../components/services/ServicesProcess";
import ServicesCoverage from "../components/services/ServicesCoverage";
import ServicesIndustries from "../components/services/ServicesIndustries";

const Services = () => {
  const navigate = useNavigate();

  // Home page ke "review" form tak le jaata hai
  const goReview = () => {
    navigate("/");
    setTimeout(() => {
      document.getElementById("review")?.scrollIntoView({ behavior: "smooth" });
    }, 400);
  };

  return (
    <>
      <BrandHeader />
      <main className="bg-[#0a1311]">
        <ServicesHero onReview={goReview} />
        <ServicesList />
        <ServicesProcess />
        <ServicesCoverage onReview={goReview} />
        <ServicesIndustries />
      </main>
      <Footer />
    </>
  );
};

export default Services;