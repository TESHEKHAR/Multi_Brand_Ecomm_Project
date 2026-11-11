import React from "react";
import Reveal from "../Reveal";

const CHIPS = [
  "Products and supplies",
  "Services",
  "Equipment",
  "Contracts and vendors",
  "Purchasing process",
];

const ServicesCoverage = ({ onReview }) => (
  <section
    id="coverage"
    aria-labelledby="cv-h"
    className="relative overflow-hidden bg-[#0a1311] px-[6vw] py-[90px] text-[#f4ead0]"
  >
    <div className="mx-auto max-w-[1100px]">
      <Reveal
        as="p"
        className="text-xs font-bold uppercase tracking-[.3em] text-[#2de2c8]"
      >
        Where it applies
      </Reveal>

      <Reveal
        as="h2"
        delay={0.1}
        className="mb-[14px] mt-3 text-[clamp(26px,3.4vw,42px)] leading-[1.1] text-[#f4ead0]"
      >
        <span id="cv-h">
          Savings across{" "}
          <em className="bg-[linear-gradient(100deg,#7ff5e1,#3b9bff,#8b6bff)] bg-clip-text not-italic text-transparent">
            what your business buys
          </em>
        </span>
      </Reveal>

      <Reveal
        as="p"
        delay={0.2}
        className="max-w-[720px] text-[17px] leading-[1.7] text-[#b9c2b6]"
      >
        Our work covers the main areas of business spend, for B2B buyers and
        decision makers in organizations of many kinds.
      </Reveal>

      <Reveal className="mt-[30px] flex flex-wrap gap-[10px]">
        {CHIPS.map((c) => (
          <span
            key={c}
            className="rounded-full border border-[#2de2c8]/50 bg-[linear-gradient(180deg,rgba(255,255,255,.18),rgba(45,226,200,.08))] px-[18px] py-[11px] text-sm font-bold shadow-[inset_0_1px_0_rgba(255,255,255,.4)]"
          >
            {c}
          </span>
        ))}
      </Reveal>

      <Reveal className="mt-[34px]">
        <button
          type="button"
          onClick={onReview}
          className="border-b-2 border-[#2de2c8] pb-[2px] font-bold text-[#2de2c8] transition-colors hover:border-[#7ff5e1] hover:text-[#7ff5e1]"
        >
          Request a complimentary procurement review
        </button>
      </Reveal>
    </div>
  </section>
);

export default ServicesCoverage;