
import React from "react";

const FAQCTA = ({ onReview }) => {
  return (
    <div className="cta">
      <h2>Ready to explore purchasing savings?</h2>

      <p>
        Start with a complimentary procurement review,
        with no upfront consulting fee.
      </p>

      <button className="btn" onClick={onReview}>
        Request a review →
      </button>
    </div>
  );
};

export default FAQCTA;
