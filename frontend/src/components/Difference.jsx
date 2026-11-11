import React from "react";
import Reveal, { useInView } from "./Reveal";

const CARDS = [
  {
    small: "Consulting firms",
    title: "Advice, with fees upfront",
    text: "Firms such as Accenture, Deloitte or Kearney provide advisory services and charge consulting fees for their expertise.",
    hi: false,
  },
  {
    small: "Traditional GPOs",
    title: "Volume, without the analysis",
    text: "Traditional GPOs aggregate purchasing volume and negotiate supplier contracts for their members.",
    hi: false,
  },
  {
    small: "Allied Purchasing Network",
    title: "Both, at no upfront cost",
    text: "Procurement analysis plus national contracts, supplier relationships, volume pricing and sourcing to deliver measurable cost reductions.",
    hi: true,
  },
];

const STEPS = [
  {
    title: "Complimentary review",
    text: "We study your purchasing practices, suppliers, pricing, products and areas of expense.",
  },
  {
    title: "Find savings",
    text: "We identify where our expertise, national contracts and combined buying power reduce costs.",
  },
  {
    title: "Custom strategy",
    text: "Once you agree to move forward, we build a customized purchasing strategy.",
  },
  {
    title: "Deliver savings",
    text: "We present and help implement savings across the products and services you buy.",
  },
];

const Difference = () => {
  const [stepsRef, stepsShown] = useInView();

  return (
    <section
      id="why-allied"
      aria-labelledby="why-h"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#0a1311,#0e1c18_60%,#0a1311)] px-[6vw] py-[90px] text-[#f4ead0]
        before:pointer-events-none before:absolute before:-right-40 before:-top-[120px] before:h-[520px] before:w-[520px] before:bg-[radial-gradient(circle,rgba(59,155,255,.22),transparent_65%)] before:content-[''] before:animate-drift12"
    >
      <div className="relative mx-auto max-w-[1100px]">
        {/* ---------- OUR DIFFERENCE ---------- */}
        <Reveal
          as="p"
          className="text-xs font-bold uppercase tracking-[.3em] text-[#2de2c8]"
        >
          Our difference
        </Reveal>

        <Reveal
          as="h2"
          className="mb-[14px] mt-3 text-[clamp(26px,3.4vw,42px)] leading-[1.1] text-[#f4ead0]"
        >
          <span id="why-h">
            How Allied Purchasing Network Is{" "}
            <em className="bg-[linear-gradient(100deg,#7ff5e1,#3b9bff,#8b6bff)] bg-clip-text not-italic text-transparent">
              Different
            </em>
          </span>
        </Reveal>

        <Reveal
          as="p"
          className="max-w-[720px] text-[17px] leading-[1.7] text-[#b9c2b6]"
        >
          Allied Purchasing Network is more than a traditional group purchasing
          organization (GPO). We combine professional procurement consulting
          with the purchasing power of a national commercial buying network, so
          you see the savings opportunities before you pay for anything.
        </Reveal>

        <div className="mb-[70px] mt-11 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5">
          {CARDS.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.12}>
              <article
                className={`h-full rounded-[18px] border bg-[linear-gradient(160deg,rgba(255,255,255,.09),rgba(255,255,255,.02))] p-[26px] backdrop-blur-[6px] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#2de2c8] hover:shadow-[0_14px_40px_rgba(45,226,200,.25),0_0_30px_rgba(45,226,200,.2)] ${
                  c.hi
                    ? "border-[#2de2c8]/60 shadow-[0_0_0_1px_rgba(45,226,200,.2),0_10px_40px_rgba(45,226,200,.15)]"
                    : "border-white/10"
                }`}
              >
                <small className="text-xs uppercase tracking-[.08em] text-[#f2b84b]">
                  {c.small}
                </small>
                <h3 className="mb-1.5 mt-1.5 text-[19px] font-bold">
                  {c.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.6] text-[#b9c2b6]">
                  {c.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* ---------- PROCUREMENT REVIEW PROCESS ---------- */}
        <Reveal
          as="h2"
          className="text-[clamp(22px,2.6vw,32px)] leading-[1.1] text-[#f4ead0]"
        >
          Our procurement review process
        </Reveal>

        <ol
          ref={stepsRef}
          className={`mb-0 mt-9 grid list-none grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[22px] p-0 transition-[opacity,transform] duration-[800ms] ease-[cubic-bezier(.2,.7,.2,1)] ${
            stepsShown
              ? "translate-y-0 opacity-100"
              : "translate-y-[34px] opacity-0"
          }`}
        >
          {STEPS.map((s, i) => (
            <li key={s.title} className="relative pt-16">
              {/* number circle */}
              <span className="absolute left-0 top-0 grid h-12 w-12 place-items-center rounded-full bg-[radial-gradient(circle_at_35%_25%,#c9fff6,#2de2c8_55%,#0fa58f)] font-extrabold text-[#04211c] shadow-[0_0_20px_rgba(45,226,200,.6)] animate-pulse2">
                {i + 1}
              </span>

              {/* connector line */}
              {i < STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  className={`absolute -right-3 left-[58px] top-[23px] hidden h-0.5 origin-left bg-[linear-gradient(90deg,#2de2c8,transparent)] transition-transform delay-[400ms] duration-1000 sm:block ${
                    stepsShown ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              )}

              <h3 className="mb-2 text-lg font-bold">{s.title}</h3>
              <p className="text-[15px] leading-[1.6] text-[#b9c2b6]">
                {s.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Difference;