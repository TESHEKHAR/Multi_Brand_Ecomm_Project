import React from "react";
import Reveal, { Icon } from "../Reveal";

const SERVICES = [
  {
    title: "Procurement consulting",
    text: "We review how you buy today and show where costs can come down.",
    points: [
      "Spend analysis by supplier and category",
      "Process and approval review",
      "Prioritized savings assessment",
    ],
    icon: (
      <>
        <path d="M4 19V5M4 19h16" />
        <path d="M8 15v-4M12 15V8M16 15v-6" />
      </>
    ),
  },
  {
    hi: true,
    title: "National GPO buying power",
    text: "Pool your volume with a national network to reach pricing that is hard to get alone.",
    points: [
      "National contracts and volume pricing",
      "Established supplier relationships",
      "Access across product and service categories",
    ],
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
      </>
    ),
  },
  {
    title: "Strategic sourcing",
    text: "We find, qualify and compare suppliers so you buy from the right sources.",
    points: [
      "Supplier shortlists and qualification",
      "Competitive bidding support",
      "Alternatives for high-cost items",
    ],
    icon: (
      <>
        <circle cx="11" cy="11" r="6" />
        <path d="M20 20l-4.5-4.5" />
      </>
    ),
  },
  {
    title: "Contract and price negotiation",
    text: "We negotiate with a benchmarked view of what fair pricing looks like.",
    points: [
      "Market price benchmarking",
      "Negotiation targets by category",
      "Terms review and renewal timing",
    ],
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M8 9h8M8 13h8M8 17h5" />
      </>
    ),
  },
  {
    title: "Custom purchasing strategy",
    text: "A tailored plan built around your priorities, volumes and risk tolerance.",
    points: [
      "Category-by-category roadmap",
      "Purchasing policies and standards",
      "Your current suppliers stay until you decide",
    ],
    icon: (
      <>
        <path d="M4 6h16M4 12h10M4 18h6" />
        <path d="M17 15l2 2 3-4" />
      </>
    ),
  },
  {
    title: "Implementation and tracking",
    text: "We help put the savings into action and track them so results hold.",
    points: [
      "Hands-on rollout support",
      "Clear reporting on spend and savings",
      "Ongoing review of new opportunities",
    ],
    icon: (
      <>
        <path d="M3 17l6-6 4 4 8-9" />
        <path d="M15 6h6v6" />
      </>
    ),
  },
];

const ServicesList = () => (
  <section
    id="services"
    aria-labelledby="sv-h"
    className="relative overflow-hidden bg-[#0a1311] px-[6vw] py-[90px] text-[#f4ead0]"
  >
    <div className="mx-auto max-w-[1100px]">
      <Reveal
        as="p"
        className="text-xs font-bold uppercase tracking-[.3em] text-[#2de2c8]"
      >
        What we do
      </Reveal>

      <Reveal
        as="h2"
        delay={0.1}
        className="mb-[14px] mt-3 text-[clamp(26px,3.4vw,42px)] leading-[1.1] text-[#f4ead0]"
      >
        <span id="sv-h">
          Six services,{" "}
          <em className="bg-[linear-gradient(100deg,#7ff5e1,#3b9bff,#8b6bff)] bg-clip-text not-italic text-transparent">
            one accountable partner
          </em>
        </span>
      </Reveal>

      <Reveal
        as="p"
        delay={0.2}
        className="max-w-[720px] text-[17px] leading-[1.7] text-[#b9c2b6]"
      >
        From the first spend review to savings that show up on your invoices,
        one team handles the work and answers for the results.
      </Reveal>

      <div className="mt-11 grid grid-cols-1 gap-5 min-[701px]:grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
        {SERVICES.map((s, i) => (
          <Reveal key={s.title} delay={(i % 3) * 0.12} className="h-full">
            <article
              className={`h-full rounded-[18px] border bg-[linear-gradient(160deg,rgba(255,255,255,.09),rgba(255,255,255,.02))] p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#2de2c8] hover:shadow-[0_14px_40px_rgba(45,226,200,.25),0_0_30px_rgba(45,226,200,.2)] ${
                s.hi
                  ? "border-[#2de2c8]/60 shadow-[0_0_0_1px_rgba(45,226,200,.2),0_10px_40px_rgba(45,226,200,.15)]"
                  : "border-white/10"
              }`}
            >
              <Icon>{s.icon}</Icon>
              <h3 className="mb-2 mt-4 text-xl font-bold">{s.title}</h3>
              <p className="mb-3 text-[15px] leading-[1.6] text-[#b9c2b6]">
                {s.text}
              </p>
              <ul className="border-t border-white/10">
                {s.points.map((pt) => (
                  <li
                    key={pt}
                    className="relative border-b border-white/[.08] py-[9px] pl-[22px] text-[14.5px]
                      before:absolute before:left-[2px] before:top-[1.05em] before:h-[7px] before:w-[7px] before:rounded-full before:bg-[#2de2c8] before:shadow-[0_0_8px_#2de2c8] before:content-['']"
                  >
                    {pt}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesList;