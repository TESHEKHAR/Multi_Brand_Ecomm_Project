import React, { useEffect, useRef, useState } from "react";

/* ---------- scroll reveal wrapper ---------- */
const Reveal = ({ as: Tag = "div", delay = 0, className = "", children }) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}s` }}
      className={`transition-[opacity,transform] duration-[800ms] ease-[cubic-bezier(.2,.7,.2,1)] motion-reduce:transition-none ${
        shown ? "translate-y-0 opacity-100" : "translate-y-[34px] opacity-0"
      } ${className}`}
    >
      {children}
    </Tag>
  );
};

/* ---------- icons ---------- */
const Icon = ({ children }) => (
  <span
    aria-hidden="true"
    className="grid h-[46px] w-[46px] flex-none place-items-center rounded-[14px] bg-[radial-gradient(circle_at_30%_25%,#9ffbee,#2de2c8_50%,#0fa58f)] shadow-[0_0_18px_rgba(45,226,200,.55)] animate-pulse2"
  >
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6 fill-none stroke-[#04211c] [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2]"
    >
      {children}
    </svg>
  </span>
);

const PILLARS = [
  {
    tag: "Trusted nationwide",
    title: "A national procurement partner you can rely on",
    text: "Allied is a credible, national procurement partner. We work with B2B organizations across the country and put transparency ahead of sales talk.",
    points: [
      "National reach with supplier relationships you can verify",
      "Clear reporting on what you spend and what you save",
      "A dedicated team, not a call center",
    ],
    icon: (
      <>
        <path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6z" />
        <path d="M8.5 12l2.5 2.5 4.5-5" />
      </>
    ),
  },
  {
    tag: "Our model",
    title: "Consulting and buying power in one model",
    text: "Our consulting plus GPO model is simple to grasp. Consultants review how you buy today, and our group purchasing power improves the price you pay for it.",
    points: [
      "Consulting finds the savings in contracts, vendors and process",
      "GPO volume pricing secures them with suppliers",
      "One partner is accountable for both",
    ],
    icon: (
      <>
        <circle cx="8" cy="12" r="4" />
        <circle cx="16" cy="12" r="4" />
      </>
    ),
  },
  {
    tag: "Low risk",
    title: "Review first, with no upfront cost",
    text: "Start with the review that carries no upfront cost. You see where you can save before you commit to anything.",
    points: [
      "No upfront consulting fee to begin",
      "No obligation after the review",
      "Your current suppliers and contracts stay in place until you decide",
    ],
    icon: (
      <>
        <rect x="5" y="11" width="14" height="9" rx="2" />
        <path d="M8 11V8a4 4 0 018 0v3" />
      </>
    ),
  },
  {
    tag: "Get started",
    title: "One clear path to measurable savings",
    text: "There is one clear path forward: request a complimentary procurement review. It takes minutes to ask for and gives you a concrete savings picture.",
    points: [
      "Share a few details about your spend",
      "We analyze suppliers, contracts and pricing",
      "You get findings and a recommended next step",
    ],
    icon: (
      <>
        <path d="M3 17l6-6 4 4 8-9" />
        <path d="M15 6h6v6" />
      </>
    ),
  },
];

const WhyChoose = () => {
  const goTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="goals"
      aria-labelledby="goals-h"
      className="relative overflow-hidden bg-[#0a1311] px-[6vw] pb-[30px] pt-[90px] text-[#f4ead0]
        before:pointer-events-none before:absolute before:-left-[170px] before:-top-[120px] before:h-[460px] before:w-[460px] before:bg-[radial-gradient(circle,rgba(45,226,200,.14),transparent_65%)] before:content-['']"
    >
      <div className="relative mx-auto max-w-[1100px]">
        <Reveal
          as="p"
          className="text-xs font-bold uppercase tracking-[.3em] text-[#2de2c8]"
        >
          Why choose Allied
        </Reveal>

        <Reveal
          as="h2"
          className="mb-[14px] mt-3 max-w-[20em] text-[clamp(26px,3.4vw,42px)] leading-[1.1] text-[#f4ead0]"
        >
          <span id="goals-h">
            Procurement consulting and national group purchasing, from one partner
          </span>
        </Reveal>

        <Reveal
          as="p"
          className="max-w-[720px] text-[17px] leading-[1.7] text-[#b9c2b6]"
        >
          Most buyers have to choose between an advisor who finds savings and a
          purchasing group that delivers pricing. Allied Purchasing Network
          brings both together, so you can lower procurement costs without
          taking on extra risk.
        </Reveal>

        <ul className="mt-11 grid grid-cols-1 gap-5 md:grid-cols-2">
          {PILLARS.map((p, i) => (
            <Reveal
              as="li"
              key={p.title}
              delay={i * 0.12}
              className="rounded-[18px] border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,.08),rgba(255,255,255,.015))] p-7"
            >
              <div className="mb-[18px] flex items-center gap-[14px]">
                <Icon>{p.icon}</Icon>
                <small className="text-xs font-bold uppercase tracking-[.1em] text-[#f2b84b]">
                  {p.tag}
                </small>
              </div>

              <h3 className="mb-3 bg-[linear-gradient(100deg,#7ff5e1,#3b9bff,#8b6bff)] bg-clip-text text-[clamp(20px,2.1vw,25px)] font-extrabold leading-tight text-transparent">
                {p.title}
              </h3>

              <p className="mb-4 text-base leading-[1.65] text-[#b9c2b6]">
                {p.text}
              </p>

              <ul>
                {p.points.map((pt) => (
                  <li
                    key={pt}
                    className="relative py-[10px] pl-6 text-[15px] leading-normal text-[#f4ead0]
                      before:absolute before:left-[2px] before:top-[1.05em] before:h-2 before:w-2 before:rounded-full before:bg-[#2de2c8] before:shadow-[0_0_8px_#2de2c8] before:content-['']"
                  >
                    {pt}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-7 flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
          <p className="italic text-[#f2b84b]">
            Built for B2B buyers and decision makers looking to cut procurement
            costs.
          </p>
          <button
            type="button"
            onClick={() => goTo("review")}
            className="border-b-2 border-[#2de2c8] pb-[2px] font-bold text-[#2de2c8] transition-colors hover:border-[#7ff5e1] hover:text-[#7ff5e1]"
          >
            Request a complimentary procurement review
          </button>
        </Reveal>
      </div>
    </section>
  );
};

export default WhyChoose;