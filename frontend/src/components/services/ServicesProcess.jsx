import React from "react";
import Reveal, { useInView } from "../Reveal";

const STEPS = [
  [
    "Complimentary review",
    "We study your purchasing practices, suppliers, pricing and areas of expense.",
  ],
  [
    "Find savings",
    "We show where our expertise, national contracts and combined buying power reduce costs.",
  ],
  [
    "Custom strategy",
    "Once you agree to move forward, we build a purchasing strategy around your goals.",
  ],
  [
    "Deliver savings",
    "We help implement the savings across the products and services you buy.",
  ],
];

const ServicesProcess = () => {
  const [ref, shown] = useInView();

  return (
    <section
      id="process"
      aria-labelledby="pr-h"
      className="relative overflow-hidden bg-[#0e1c18] px-[6vw] py-[90px] text-[#f4ead0]"
    >
      <div className="mx-auto max-w-[1100px]">
        <Reveal
          as="p"
          className="text-xs font-bold uppercase tracking-[.3em] text-[#2de2c8]"
        >
          How it works
        </Reveal>

        <Reveal
          as="h2"
          delay={0.1}
          className="mb-[14px] mt-3 text-[clamp(26px,3.4vw,42px)] leading-[1.1] text-[#f4ead0]"
        >
          <span id="pr-h">
            From first review to{" "}
            <em className="bg-[linear-gradient(100deg,#7ff5e1,#3b9bff,#8b6bff)] bg-clip-text not-italic text-transparent">
              measurable savings
            </em>
          </span>
        </Reveal>

        <ol
          ref={ref}
          className={`mt-10 grid list-none grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[22px] p-0 transition-[opacity,transform] duration-[800ms] ease-[cubic-bezier(.2,.7,.2,1)] ${
            shown ? "translate-y-0 opacity-100" : "translate-y-[34px] opacity-0"
          }`}
        >
          {STEPS.map(([title, text], i) => (
            <li key={title} className="relative pt-16">
              <span className="absolute left-0 top-0 grid h-12 w-12 place-items-center rounded-full bg-[radial-gradient(circle_at_35%_25%,#c9fff6,#2de2c8_55%,#0fa58f)] font-extrabold text-[#04211c] shadow-[0_0_20px_rgba(45,226,200,.6)] animate-pulse2">
                {i + 1}
              </span>

              {i < STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  className={`absolute -right-3 left-[58px] top-[23px] hidden h-0.5 origin-left bg-[linear-gradient(90deg,#2de2c8,transparent)] transition-transform delay-[400ms] duration-1000 sm:block ${
                    shown ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              )}

              <h3 className="mb-2 text-lg font-bold">{title}</h3>
              <p className="text-[15px] leading-[1.6] text-[#b9c2b6]">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ServicesProcess;