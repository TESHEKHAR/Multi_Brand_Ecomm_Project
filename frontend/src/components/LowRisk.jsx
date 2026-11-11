import React from "react";
import { useInView } from "./Reveal";

const PROOF = [
  { title: "No upfront fee", text: "No upfront consulting fee to begin." },
  { title: "No obligation", text: "Nothing to commit to after the review." },
  {
    title: "Contracts stay put",
    text: "Current suppliers stay in place until you decide.",
  },
];

const STEPS = ["Review", "Find savings", "Strategy", "Deliver"];

// before = current spend, after = spend after review (percent height)
const BARS = [
  { label: "Products", b: 82, a: 58 },
  { label: "Services", b: 64, a: 44 },
  { label: "Equipment", b: 90, a: 62 },
  { label: "Supplies", b: 52, a: 40 },
  { label: "Vendors", b: 72, a: 50 },
  { label: "Other", b: 46, a: 34 },
];

const LowRisk = () => {
  const [ref, shown] = useInView(0.2);

  const goTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  // jab tak section screen par nahi aata, element hidden rahta hai
  const on = (cls) => (shown ? cls : "opacity-0");
  const delay = (s) => ({ animationDelay: `${s}s` });

  return (
    <section
      id="low-risk"
      aria-labelledby="lr-h"
      className="relative overflow-hidden bg-[#0a1311] px-[6vw] pb-[90px] pt-5 text-[#f4ead0]"
    >
      <div
        ref={ref}
        className="relative mx-auto grid max-w-[1100px] items-center gap-11 min-[961px]:grid-cols-[1.02fr_.98fr] min-[961px]:gap-14"
      >
        {/* ================= LEFT: TEXT ================= */}
        <div>
          <span
            style={delay(0.1)}
            className={`inline-flex items-center gap-3 text-[.78rem] font-bold uppercase tracking-[.14em] text-[#2de2c8] before:h-px before:w-8 before:bg-[#f2b84b] before:content-[''] ${on(
              "animate-lr-up"
            )}`}
          >
            A low-risk approach to procurement
          </span>

          <h2
            id="lr-h"
            className="mt-5 text-[clamp(2rem,4.2vw,3.4rem)] font-extrabold leading-[1.05] tracking-[-.03em] text-[#f4ead0]"
          >
            <span className="block overflow-hidden pb-[.06em]">
              <span
                style={delay(0.2)}
                className={`inline-block translate-y-[105%] ${
                  shown ? "animate-lr-rise" : ""
                }`}
              >
                Lower what you pay.
              </span>
            </span>
            <span className="block overflow-hidden pb-[.06em]">
              <span
                style={delay(0.35)}
                className={`inline-block translate-y-[105%] bg-[linear-gradient(90deg,#fff_0%,#7ff5e1_45%,#f2b84b_100%)] bg-clip-text text-transparent ${
                  shown ? "animate-lr-rise" : ""
                }`}
              >
                Without the upfront risk.
              </span>
            </span>
          </h2>

          <p
            style={delay(0.55)}
            className={`mt-6 max-w-[50ch] text-[1.08rem] leading-relaxed text-[#b9c2b6] ${on(
              "animate-lr-up"
            )}`}
          >
            Allied Purchasing Network brings procurement consulting and
            national group purchasing power together, so you can cut costs on
            the products and services you already buy.
          </p>

          {/* buttons */}
          <div
            style={delay(0.7)}
            className={`mt-[30px] flex flex-wrap gap-[14px] ${on(
              "animate-lr-up"
            )}`}
          >
            <button
              type="button"
              onClick={() => goTo("review")}
              className="group inline-flex items-center gap-[10px] rounded-[10px] bg-[#f2b84b] px-6 py-[15px] text-[.95rem] font-bold text-[#1a1302] shadow-[0_14px_32px_-14px_rgba(242,184,75,.9)] transition-all duration-[250ms] hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-14px_rgba(242,184,75,1)]"
            >
              Get a free procurement review
              <span
                aria-hidden="true"
                className="transition-transform duration-[250ms] group-hover:translate-x-1"
              >
                →
              </span>
            </button>

            <button
              type="button"
              onClick={() => goTo("why-allied")}
              className="inline-flex items-center rounded-[10px] border border-white/10 bg-white/[.03] px-6 py-[15px] text-[.95rem] font-bold text-[#f4ead0] transition-colors duration-[250ms] hover:bg-white/[.08]"
            >
              How it works
            </button>
          </div>

          {/* proof points */}
          <div
            style={delay(0.85)}
            className={`mt-10 grid gap-[18px] border-t border-white/10 pt-6 sm:grid-cols-3 ${on(
              "animate-lr-up"
            )}`}
          >
            {PROOF.map((p) => (
              <div key={p.title}>
                <h3 className="text-[.98rem] font-bold">{p.title}</h3>
                <p className="mt-1 text-[.86rem] text-[#b9c2b6]">{p.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ================= RIGHT: PANEL ================= */}
        <div
          style={delay(0.35)}
          className={on("animate-lr-up")}
          aria-label="Illustrative procurement review panel"
        >
          <div
            style={delay(1.5)}
            className={`relative overflow-hidden rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.085),rgba(255,255,255,.03))] p-[26px] shadow-[0_40px_80px_-30px_rgba(0,0,0,.6),inset_0_1px_0_rgba(255,255,255,.08)] backdrop-blur-[12px] max-[560px]:p-5
              after:pointer-events-none after:absolute after:inset-y-0 after:-left-[60%] after:w-[40%] after:bg-[linear-gradient(100deg,transparent,rgba(255,255,255,.08),transparent)] after:content-[''] ${
                shown
                  ? "animate-lr-bob after:animate-lr-sheen after:[animation-delay:2s]"
                  : ""
              }`}
          >
            {/* header */}
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-[.95rem] font-bold">Procurement review</div>
                <div className="mt-0.5 text-[.78rem] text-[#b9c2b6]">
                  Complimentary · Illustrative view
                </div>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#2de2c8]/[.12] px-[10px] py-1.5 text-xs font-bold text-[#2de2c8]">
                <i
                  className={`h-[7px] w-[7px] rounded-full bg-[#2de2c8] ${
                    shown ? "animate-lr-beat" : ""
                  }`}
                />
                In progress
              </span>
            </div>

            {/* stepper */}
            <div
              aria-hidden="true"
              className="relative mb-[22px] mt-6 grid grid-cols-4"
            >
              {/* track */}
              <div className="absolute left-[12%] right-[12%] top-[13px] h-0.5 bg-white/[.12]" />
              {/* progress */}
              <div
                style={delay(1.2)}
                className={`absolute left-[12%] top-[13px] h-0.5 w-[76%] origin-left scale-x-0 bg-[linear-gradient(90deg,#2de2c8,#f2b84b)] ${
                  shown ? "animate-lr-prog" : ""
                }`}
              />
              {STEPS.map((s, i) => (
                <div
                  key={s}
                  className="relative text-center text-[.72rem] text-[#b9c2b6]"
                >
                  <div
                    style={delay(1.2 + i * 0.8)}
                    className={`mx-auto mb-2 grid h-7 w-7 place-items-center rounded-full border-2 border-white/20 bg-[#0a1311] text-xs font-bold text-[#b9c2b6] ${
                      shown ? "animate-lr-on" : ""
                    }`}
                  >
                    {i + 1}
                  </div>
                  <span>{s}</span>
                </div>
              ))}
            </div>

            {/* chart */}
            <div className="mt-1.5 rounded-2xl border border-white/[.08] bg-[#0a1311]/60 px-[18px] pb-[14px] pt-[18px]">
              <div className="flex flex-wrap items-baseline justify-between gap-[10px] text-[.8rem] text-[#b9c2b6]">
                <span>Spend by category</span>
                <div className="flex gap-[14px] text-xs">
                  <span className="inline-flex items-center gap-1.5">
                    <i className="inline-block h-2.5 w-2.5 rounded-[3px] bg-[#5d7a6d]" />
                    Current
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <i className="inline-block h-2.5 w-2.5 rounded-[3px] bg-[#f2b84b]" />
                    After review
                  </span>
                </div>
              </div>

              <div
                aria-hidden="true"
                className="mt-[18px] grid h-[150px] grid-cols-6 items-end gap-3 max-[560px]:h-[120px]"
              >
                {BARS.map((bar, n) => (
                  <div
                    key={bar.label}
                    className="flex h-full items-end justify-center gap-1"
                  >
                    <div
                      style={{
                        height: `${bar.b}%`,
                        animationDelay: `${0.9 + n * 0.15}s`,
                      }}
                      className={`w-[42%] origin-bottom scale-y-0 rounded-[6px_6px_2px_2px] bg-[linear-gradient(180deg,#6b8579,#34493f)] ${
                        shown ? "animate-lr-grow" : ""
                      }`}
                    />
                    <div
                      style={{
                        height: `${bar.a}%`,
                        animationDelay: `${1.4 + n * 0.15}s`,
                      }}
                      className={`w-[42%] origin-bottom scale-y-0 rounded-[6px_6px_2px_2px] bg-[linear-gradient(180deg,#f2b84b,#c98a16)] shadow-[0_0_22px_-6px_rgba(242,184,75,.7)] ${
                        shown ? "animate-lr-grow" : ""
                      }`}
                    />
                  </div>
                ))}
              </div>

              <div
                aria-hidden="true"
                className="mt-2 grid grid-cols-6 gap-3 text-center text-[.66rem] text-[#b9c2b6] max-[560px]:gap-1.5 max-[560px]:text-[.6rem]"
              >
                {BARS.map((bar) => (
                  <span key={bar.label}>{bar.label}</span>
                ))}
              </div>

              <div className="mt-[10px] text-[.72rem] text-[#b9c2b6] opacity-80">
                Illustrative only. Your results depend on your spend and
                contracts.
              </div>
            </div>

            {/* toast */}
            <div
              role="status"
              style={delay(2.4)}
              className={`mt-4 flex items-center gap-3 rounded-[14px] bg-white px-4 py-[14px] text-[#0a1d33] shadow-[0_24px_50px_-18px_rgba(0,0,0,.6)] ${on(
                "animate-lr-up"
              )}`}
            >
              <div
                aria-hidden="true"
                className="grid h-8 w-8 flex-none place-items-center rounded-full bg-[#0fa58f]/[.18] font-extrabold text-[#0b7d6c]"
              >
                ✓
              </div>
              <div>
                <strong className="block text-[.92rem]">Savings identified</strong>
                <small className="text-[.76rem] text-[#5b6b80]">
                  Findings and next step shared with you
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LowRisk;