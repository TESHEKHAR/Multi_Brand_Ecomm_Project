import React, { useEffect, useRef, useState } from "react";

/* ---------- in-view hook ---------- */
const useInView = (threshold = 0.15) => {
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
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, shown];
};

/* ---------- data ---------- */
const CARDS = [
  {
    tag: "Buyers",
    sm: "Purchasing needs",
    text: "Share what you need to buy and get matched with trusted supply.",
    color: "#2fa4e7",
    pos: "left-[3%] top-[6%]",
    side: "l",
    delay: ".5s",
    float: "animate-float1",
  },
  {
    tag: "Suppliers",
    sm: "Products & brands",
    text: "List your products and brands in front of qualified buyers.",
    color: "#14b8a6",
    pos: "left-[70%] top-[6%]",
    side: "r",
    delay: ".7s",
    float: "animate-float2",
  },
  {
    tag: "Products",
    sm: "Catalog & categories",
    text: "One organised catalogue, structured across every category.",
    color: "#6366f1",
    pos: "left-[3%] top-[62%]",
    side: "l",
    delay: ".9s",
    float: "animate-float4",
  },
  {
    tag: "Partners",
    sm: "Business relationships",
    text: "Build lasting partnerships that grow the whole ecosystem.",
    color: "#f59e0b",
    pos: "left-[70%] top-[62%]",
    side: "r",
    delay: "1.1s",
    float: "animate-float3",
  },
];

// SVG lines: hub (50,50) se har card tak
const LINES = [
  { d: "M16.5 22 L50 50", color: "#2fa4e7" },
  { d: "M83.5 22 L50 50", color: "#14b8a6" },
  { d: "M16.5 78 L50 50", color: "#6366f1" },
  { d: "M83.5 78 L50 50", color: "#f59e0b" },
];

const Network = () => {
  const [headRef, headShown] = useInView();
  const [diagRef, shown] = useInView();
  const [ready, setReady] = useState(false);

  // entrance khatam hone ke baad hover delay hata do
  useEffect(() => {
    if (!shown) return;
    const t = setTimeout(() => setReady(true), 2200);
    return () => clearTimeout(t);
  }, [shown]);

  const rv = (delay) => ({
    className: `transition-[opacity,transform] duration-[800ms] ease-[cubic-bezier(.2,.8,.2,1)] ${
      headShown ? "translate-y-0 opacity-100" : "translate-y-[22px] opacity-0"
    }`,
    style: { transitionDelay: `${delay}s` },
  });

  return (
    <section
      id="network"
      aria-labelledby="net-h"
      className="relative overflow-hidden bg-[#0a1311] bg-[radial-gradient(900px_500px_at_50%_0%,rgba(47,164,231,.12),transparent_70%)] px-[clamp(18px,4vw,40px)] py-[clamp(56px,8vw,96px)] font-sans text-[#f4ead0]
        before:pointer-events-none before:absolute before:-left-40 before:-top-[120px] before:h-[520px] before:w-[520px] before:rounded-full before:bg-[radial-gradient(circle,rgba(99,102,241,.18),transparent_65%)] before:blur-[40px] before:content-[''] before:animate-ndrift"
    >
      <div className="relative mx-auto max-w-[1100px]">
        {/* ---------- heading ---------- */}
        <div ref={headRef}>
          <span
            {...rv(0)}
            className={`inline-flex items-center gap-[10px] text-xs font-bold uppercase tracking-[.16em] text-[#2fa4e7] ${rv(0).className}
              before:h-[3px] before:w-7 before:origin-left before:scale-x-0 before:rounded before:bg-gradient-to-r before:from-[#2fa4e7] before:to-[#6366f1] before:content-[''] ${
                headShown ? "before:animate-eyebrow" : ""
              }`}
          >
            The network
          </span>

          <h2
            id="net-h"
            {...rv(0.1)}
            className={`mb-3 mt-[14px] text-[clamp(28px,4.2vw,46px)] font-bold leading-[1.1] tracking-[-.02em] text-[#f8fafc] ${rv(0.1).className}`}
          >
            One ecosystem. Multiple stakeholders.
          </h2>

          <p
            {...rv(0.25)}
            className={`mb-[clamp(32px,5vw,56px)] max-w-[580px] text-[clamp(15px,1.6vw,17px)] leading-[1.6] text-[#94a3b8] ${rv(0.25).className}`}
          >
            A visual model that explains the network in seconds.
          </p>
        </div>

        {/* ---------- diagram ---------- */}
        <div
          ref={diagRef}
          className="relative aspect-[16/9] max-[960px]:aspect-square max-[720px]:flex max-[720px]:aspect-auto max-[720px]:flex-col max-[720px]:gap-[14px]"
        >
          {/* connecting lines (mobile par hidden) */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="absolute inset-0 z-[1] h-full w-full overflow-visible max-[720px]:hidden"
          >
            {LINES.map((l) => (
              <React.Fragment key={l.d}>
                <path
                  d={l.d}
                  pathLength="100"
                  vectorEffect="non-scaling-stroke"
                  className="fill-none stroke-[#243244] [stroke-width:2]"
                  style={{
                    strokeDasharray: 100,
                    strokeDashoffset: shown ? 0 : 100,
                    transition:
                      "stroke-dashoffset 1.3s cubic-bezier(.6,0,.2,1) .35s",
                  }}
                />
                <path
                  d={l.d}
                  pathLength="100"
                  vectorEffect="non-scaling-stroke"
                  className={`fill-none [stroke-linecap:round] [stroke-width:3] ${
                    shown ? "animate-dash" : ""
                  }`}
                  style={{
                    stroke: l.color,
                    color: l.color,
                    strokeDasharray: "1.5 9",
                    opacity: shown ? 0.9 : 0,
                    filter: "drop-shadow(0 0 4px currentColor)",
                    transition: "opacity .6s ease 1.6s",
                  }}
                />
              </React.Fragment>
            ))}
          </svg>

          {/* 4 cards */}
          {CARDS.map((c) => (
            <div
              key={c.tag}
              style={{
                "--c": c.color,
                transitionDelay: ready ? "0s" : c.delay,
              }}
              className={`absolute z-[2] h-[32%] w-[27%] rounded-[18px] border border-[#1c2736] bg-[linear-gradient(160deg,#111a26,#0b1119)] p-[clamp(16px,2.2vw,24px)] shadow-[0_12px_34px_rgba(0,0,0,.6)]
                transition-[opacity,transform,box-shadow,border-color] duration-[700ms] ease-[cubic-bezier(.2,.8,.2,1)]
                max-[720px]:static max-[720px]:h-auto max-[720px]:w-full
                before:absolute before:left-[22px] before:top-0 before:h-1 before:w-11 before:rounded-b before:bg-[var(--c)] before:shadow-[0_0_12px_var(--c)] before:content-['']
                after:pointer-events-none after:absolute after:inset-0 after:rounded-[18px] after:bg-[radial-gradient(circle_at_50%_0%,var(--c),transparent_70%)] after:opacity-0 after:transition-opacity after:duration-[400ms] after:content-['']
                ${c.pos} ${
                shown
                  ? `translate-x-0 translate-y-0 opacity-100 ${c.float} hover:-translate-y-2 hover:border-[var(--c)] hover:shadow-[0_22px_50px_rgba(0,0,0,.7),0_0_28px_-6px_var(--c)] hover:after:opacity-[.12]`
                  : `opacity-0 max-[720px]:translate-x-0 max-[720px]:translate-y-6 ${
                      c.side === "l" ? "-translate-x-10" : "translate-x-10"
                    }`
              }`}
            >
              <span
                className="mt-[6px] block text-sm font-extrabold uppercase tracking-[.12em]"
                style={{ color: c.color }}
              >
                {c.tag}
              </span>
              <span className="mb-2 mt-1 block text-xs font-semibold text-[#f8fafc]">
                {c.sm}
              </span>
              <p className="text-[13.5px] leading-[1.5] text-[#94a3b8]">
                {c.text}
              </p>
            </div>
          ))}

          {/* center hub */}
          <div
            className={`absolute left-1/2 top-1/2 z-[3] grid aspect-square w-[clamp(150px,22%,235px)] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#2fa4e7]/35 bg-[radial-gradient(circle_at_30%_25%,#1e3d66,#07111f_72%)] text-center text-[clamp(12px,1.5vw,16px)] font-extrabold leading-[1.4] tracking-[.1em] text-[#f8fafc]
              shadow-[0_0_0_1px_rgba(255,255,255,.04),0_0_60px_-10px_rgba(47,164,231,.55)] transition-shadow duration-500 hover:shadow-[0_0_0_1px_rgba(255,255,255,.06),0_0_90px_-8px_rgba(47,164,231,.8)]
              max-[720px]:static max-[720px]:order-first max-[720px]:mx-auto max-[720px]:mb-2.5 max-[720px]:mt-1.5 max-[720px]:w-[180px] max-[720px]:translate-x-0 max-[720px]:translate-y-0
              before:pointer-events-none before:absolute before:-inset-3 before:rounded-full before:border-2 before:border-[#2fa4e7]/55 before:opacity-0 before:content-['']
              after:pointer-events-none after:absolute after:-inset-3 after:rounded-full after:border-2 after:border-[#2fa4e7]/55 after:opacity-0 after:content-[''] ${
                shown
                  ? "animate-hub-in max-[720px]:animate-hub-in-m before:animate-ping1 after:animate-ping2"
                  : "opacity-0"
              }`}
          >
            <div>
              <span className="block">Allied</span>
              <span className="block">Purchasing</span>
              <span className="block">Network</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Network;