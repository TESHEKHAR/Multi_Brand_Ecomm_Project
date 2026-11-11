import React, { useEffect, useRef } from "react";

const LEAD =
  "A modern B2B procurement platform built around cost reduction, sourcing expertise and national reach.";

const BULLETS = [
  ["Lower costs", "through pooled buying power"],
  ["Expert sourcing", "across vetted suppliers"],
  ["National reach", "with one trusted network"],
];

// target = id of the section on your page
const BUTTONS = [
  { label: "Purchasing", target: "goals" },
  { label: "Procurement", target: "why-allied" },
  { label: "Sourcing", target: "network" },
];

/* ---------- glowing network canvas ---------- */
const NetworkCanvas = () => {
  const ref = useRef(null);

  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const D = window.devicePixelRatio || 1;
    const LINK = 170;

    let W = 0, H = 0, N = [], pulses = [], visible = true, raf;
    const mouse = { x: -999, y: -999 };

    const size = () => {
      const w = c.clientWidth, h = c.clientHeight;
      if (w === W && h === H && N.length) return;
      W = w; H = h;
      c.width = W * D; c.height = H * D;
      ctx.setTransform(D, 0, 0, D, 0, 0);
      const n = Math.round(Math.min(46, W / 26));
      N = Array.from({ length: n }, () => ({
        x: W * (0.3 + Math.random() * 0.7),
        y: H * (0.12 + Math.random() * 0.8),
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: 1.5 + Math.random() * 2.5,
      }));
    };

    const onMove = (e) => {
      const r = c.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };

    const frame = (t) => {
      if (visible) {
        ctx.clearRect(0, 0, W, H);

        N.forEach((p) => {
          if (!reduce) { p.x += p.vx; p.y += p.vy; }
          if (p.x < W * 0.25 || p.x > W) p.vx *= -1;
          if (p.y < 0 || p.y > H) p.vy *= -1;
          const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy);
          if (d > 0 && d < 120) { p.x += (dx / d) * 0.8; p.y += (dy / d) * 0.8; }
        });

        ctx.lineWidth = 1;
        for (let i = 0; i < N.length; i++) {
          for (let j = i + 1; j < N.length; j++) {
            const a = N[i], b = N[j], d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d < LINK) {
              const o = 1 - d / LINK;
              ctx.strokeStyle = `rgba(45,226,200,${o * 0.55})`;
              ctx.shadowColor = "#2de2c8";
              ctx.shadowBlur = 8;
              ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
              if (!reduce && Math.random() < 0.0009 && pulses.length < 14)
                pulses.push({ a, b, t: 0 });
            }
          }
        }

        for (let k = pulses.length - 1; k >= 0; k--) {
          const s = pulses[k];
          s.t += 0.018;
          if (s.t > 1) { pulses.splice(k, 1); continue; }
          const px = s.a.x + (s.b.x - s.a.x) * s.t;
          const py = s.a.y + (s.b.y - s.a.y) * s.t;
          ctx.shadowBlur = 22; ctx.shadowColor = "#f2b84b"; ctx.fillStyle = "#ffe3a0";
          ctx.beginPath(); ctx.arc(px, py, 2.6, 0, 7); ctx.fill();
        }

        N.forEach((p) => {
          const g = 0.6 + 0.4 * Math.sin(t / 600 + p.x);
          ctx.shadowColor = "#2de2c8"; ctx.shadowBlur = 18 * g; ctx.fillStyle = "#b8fff3";
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fill();
          ctx.shadowBlur = 0; ctx.strokeStyle = `rgba(45,226,200,${0.35 * g})`;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r + 5 + g * 3, 0, 7); ctx.stroke();
        });
      }
      if (!reduce) raf = requestAnimationFrame(frame);
    };

    size();
    window.addEventListener("resize", size);
    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(frame);

    const io = new IntersectionObserver((es) => { visible = es[0].isIntersecting; });
    io.observe(c.parentElement);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
      window.removeEventListener("pointermove", onMove);
      io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 -z-[1] h-full w-full"
    />
  );
};

/* ---------- HERO ---------- */
const Hero = () => {
  const goTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative isolate flex min-h-screen flex-col overflow-hidden bg-[#0a1311] text-[#f4ead0]">
      {/* terrain background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-[3] bg-[radial-gradient(60%_50%_at_70%_45%,#56664f_0%,transparent_70%),radial-gradient(40%_40%_at_20%_80%,#2b3a30_0%,transparent_70%),linear-gradient(135deg,#1a2a25,#0a1311_70%)]"
      >
        <svg className="absolute inset-0 h-full w-full opacity-[.38] mix-blend-overlay">
          <filter id="hero-noise">
            <feTurbulence type="fractalNoise" baseFrequency=".008 .02" numOctaves="4" seed="7" />
            <feColorMatrix values="0 0 0 0 .5  0 0 0 0 .55  0 0 0 0 .48  0 0 0 1.4 -.35" />
          </filter>
          <rect width="100%" height="100%" filter="url(#hero-noise)" />
        </svg>
      </div>

      {/* dark shade */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-[2] bg-[linear-gradient(90deg,rgba(10,19,17,.92)_0%,rgba(10,19,17,.55)_45%,rgba(10,19,17,.1)_100%)] max-md:bg-[#0a1311]/70"
      />

      <NetworkCanvas />

      {/* content (top padding = space for the fixed header) */}
      <div className="flex max-w-[760px] flex-1 flex-col justify-center px-[6vw] pb-[6vh] pt-[calc(6vh+90px)]">
        <h1
          className="translate-y-6 bg-[linear-gradient(100deg,#7ff5e1_0%,#2de2c8_25%,#3b9bff_55%,#8b6bff_80%,#7ff5e1_100%)] bg-[length:220%_100%] bg-clip-text text-[clamp(30px,4vw,54px)] font-extrabold uppercase leading-[.98] tracking-[-.01em] text-transparent opacity-0 [filter:drop-shadow(0_0_10px_rgba(59,155,255,.55))_drop-shadow(0_0_28px_rgba(45,226,200,.45))] animate-h1-in"
        >
          Allied<br />Purchasing<br />Network
        </h1>

        <div className="mb-[18px] mt-[26px] h-[3px] w-16 origin-left scale-x-0 rounded bg-[linear-gradient(90deg,#2de2c8,transparent)] shadow-[0_0_14px_#2de2c8] animate-rule-in" />

        <h2 className="text-[clamp(20px,2.6vw,30px)] font-bold text-[#b9c2b6] opacity-0 animate-h2-in">
          website under construction
        </h2>

        <p
          className="my-[18px] mb-[22px] max-w-[560px] text-base leading-relaxed text-[#b9c2b6]"
          aria-label={LEAD}
        >
          {LEAD.split(" ").map((w, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="mr-[.28em] inline-block translate-y-2 opacity-0 blur-[6px] animate-word-in"
              style={{ animationDelay: `${1 + i * 0.06}s` }}
            >
              {w}
            </span>
          ))}
        </p>

        <ul className="mb-8 grid gap-3">
          {BULLETS.map(([bold, rest], i) => (
            <li
              key={bold}
              className="-translate-x-7 bg-[linear-gradient(180deg,#fff_0%,#fff_42%,#cfd8e3_50%,#fff_62%,#f2f6fb_100%)] bg-clip-text text-lg font-semibold text-transparent opacity-0 blur-[4px] animate-slide-in"
              style={{ animationDelay: `${2 + i * 0.25}s` }}
            >
              <strong className="font-extrabold">{bold}</strong> {rest}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-[14px]">
          {BUTTONS.map(({ label, target }, i) => (
            <button
              key={label}
              type="button"
              onClick={() => goTo(target)}
              style={{ animationDelay: `${3 + i * 0.35}s` }}
              className="relative inline-block cursor-pointer overflow-hidden rounded-xl border border-[#2de2c8]/60 bg-[linear-gradient(180deg,rgba(255,255,255,.22),rgba(255,255,255,.05)_50%,rgba(45,226,200,.14))] px-[26px] py-[14px] text-center text-xs font-bold uppercase leading-none tracking-[.16em] text-[#f4ead0] opacity-0 shadow-[inset_0_1px_0_rgba(255,255,255,.5),0_6px_18px_rgba(0,0,0,.35)] backdrop-blur-[6px] transition-all duration-200 animate-btn-in
                before:absolute before:inset-x-[4%] before:top-[2px] before:h-[46%] before:rounded-[10px_10px_40px_40px] before:bg-[linear-gradient(180deg,rgba(255,255,255,.28),transparent)] before:content-['']
                after:absolute after:left-[-70%] after:top-0 after:h-full after:w-[45%] after:-skew-x-[22deg] after:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.65),transparent)] after:content-[''] after:animate-sheen
                hover:-translate-y-[3px] hover:border-[#2de2c8] hover:shadow-[inset_0_1px_0_rgba(255,255,255,.7),0_10px_26px_rgba(45,226,200,.45),0_0_26px_rgba(45,226,200,.65)] active:translate-y-0
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#2de2c8]"
            >
              <span className="relative z-10">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;