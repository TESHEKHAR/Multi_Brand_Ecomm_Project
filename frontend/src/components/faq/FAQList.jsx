
import React from "react";

const faqData = [
  {
    question: "What is Allied Purchasing Network?",
    answer:
      "Allied Purchasing Network combines professional procurement consulting with the purchasing power of a national GPO and commercial buying network.",
  },
  {
    question: "Is the initial procurement review really free?",
    answer:
      "Yes. There is no upfront consulting fee for the initial procurement review and cost-reduction process.",
  },
  {
    question: "How is Allied different from a traditional GPO?",
    answer:
      "Traditional GPOs mainly aggregate volume and negotiate supplier contracts. Allied also provides procurement analysis and helps put the savings into action.",
  },
  {
    question: "Who is Allied Purchasing Network built for?",
    answer:
      "B2B buyers and decision makers who want to reduce procurement costs without adding risk or complexity.",
  },
  {
    question: "Do I have to switch suppliers?",
    answer:
      "No. Your current suppliers and contracts stay in place until you decide what to change.",
  },
  {
    question: "Which industries do you work with?",
    answer:
      "We work across industries including manufacturing, healthcare, hospitality, education, government, financial services, retail and distribution.",
  },
  {
    question: "What happens after I request a review?",
    answer:
      "We learn about your purchasing needs, review available spend and supplier information, and share potential opportunities and recommended next steps.",
  },
];

const FAQList = () => {
  return (
    <div className="faq-list">
      {faqData.map((item, index) => (
        <details
          key={index}
          className="faq-item"
          style={{ "--i": index }}
        >
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
};

export default FAQList;
