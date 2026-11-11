
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import BrandHeader from "../components/BrandHeader";
import Footer from "../components/Footer";

import FAQHero from "../components/faq/FAQHero";
import FAQList from "../components/faq/FAQList";
import FAQCTA from "../components/faq/FAQCTA";

import "../components/faq/FAQ.css";

const FAQ = () => {
  const navigate = useNavigate();

  // Home page ke review form tak le jaata hai
  const goReview = () => {
    navigate("/");

    setTimeout(() => {
      document.getElementById("review")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 400);
  };

  useEffect(() => {
    document.title = "FAQs | Allied Purchasing Network";

    let description = document.querySelector(
      'meta[name="description"]'
    );

    if (!description) {
      description = document.createElement("meta");
      description.name = "description";
      document.head.appendChild(description);
    }

    description.content =
      "Answers to common questions about Allied Purchasing Network procurement consulting and group purchasing.";

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is Allied Purchasing Network?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Allied Purchasing Network combines professional procurement consulting with the purchasing power of a national GPO and commercial buying network.",
          },
        },
        {
          "@type": "Question",
          name: "Is the initial procurement review really free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. There is no upfront consulting fee for the initial procurement review and cost-reduction process.",
          },
        },
        {
          "@type": "Question",
          name: "How is Allied different from a traditional GPO?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Traditional GPOs mainly aggregate volume and negotiate supplier contracts. Allied also provides procurement analysis and helps put the savings into action.",
          },
        },
        {
          "@type": "Question",
          name: "Who is Allied Purchasing Network built for?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "B2B buyers and decision makers who want to reduce procurement costs without adding risk or complexity.",
          },
        },
        {
          "@type": "Question",
          name: "Do I have to switch suppliers?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Your current suppliers and contracts stay in place until you decide what to change.",
          },
        },
        {
          "@type": "Question",
          name: "Which industries do you work with?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We work across industries including manufacturing, healthcare, hospitality, education, government, financial services, retail and distribution.",
          },
        },
        {
          "@type": "Question",
          name: "What happens after I request a review?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We learn about your purchasing needs, review available spend and supplier information, and share potential opportunities and recommended next steps.",
          },
        },
      ],
    };

    let schema = document.getElementById("faq-schema");

    if (!schema) {
      schema = document.createElement("script");
      schema.id = "faq-schema";
      schema.type = "application/ld+json";
      document.head.appendChild(schema);
    }

    schema.textContent = JSON.stringify(faqSchema);

    return () => {
      document.getElementById("faq-schema")?.remove();
    };
  }, []);

  return (
    <>
      <BrandHeader />

      <main className="faq-page bg-[#0a1311]">
        <FAQHero />

        <section className="faq-main">
          <FAQList />
          <FAQCTA onReview={goReview} />
        </section>
      </main>

      <Footer />
    </>
  );
};

export default FAQ;
