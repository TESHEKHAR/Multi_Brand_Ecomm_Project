import React from "react";

const ServicesHero = ({ onReview }) => (
  <header className="relative isolate flex min-h-[70vh] flex-col justify-center overflow-hidden px-[6vw] pb-[8vh] pt-[calc(8vh+90px)]">
    {/* background */}
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-[2] bg-[radial-gradient(60%_50%_at_75%_40%,#56664f_0%,transparent_70%),radial-gradient(40%_40%_at_15%_85%,#2b3a30_0%,transparent_70%),linear-gradient(135deg,#1a2a25,#0a1311_70%)]"
    />
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -right-[140px] -top-[100px] -z-[1] h-[520px] w-[520px] bg-[radial-gradient(circle,rgba(59,155,255,.22),transparent_65%)] animate-drift12"
    />

    <div className="max-w-[800px]">
      <h1 className="translate-y-6 bg-[linear-gradient(100deg,#7ff5e1_0%,#2de2c8_25%,#3b9bff_55%,#8b6bff_80%,#7ff5e1_100%)] bg-[length:220%_100%] bg-clip-text text-[clamp(32px,4.4vw,56px)] font-extrabold uppercase leading-[1.02] tracking-[-.01em] text-transparent opacity-0 [filter:drop-shadow(0_0_10px_rgba(59,155,255,.55))_drop-shadow(0_0_28px_rgba(45,226,200,.45))] animate-h1-in">
        Our
        <br />
        Services
      </h1>

      <div className="mb-[18px] mt-[26px] h-[3px] w-16 origin-left scale-x-0 rounded bg-[linear-gradient(90deg,#2de2c8,transparent)] shadow-[0_0_14px_#2de2c8] animate-rule-in" />

      <p className="translate-y-6 text-[clamp(18px,2.2vw,24px)] font-bold text-[#b9c2b6] opacity-0 animate-h2-in">
        Consulting that finds the savings. Buying power that secures them.
      </p>

      <p
        style={{ animationDelay: ".9s" }}
        className="mb-[30px] mt-[18px] max-w-[620px] translate-y-6 text-base leading-[1.65] text-[#b9c2b6] opacity-0 animate-h2-in"
      >
        Allied Purchasing Network combines procurement consulting with the
        purchasing power of a national GPO. Every engagement starts with a
        review that carries no upfront consulting fee.
      </p>

      <div
        style={{ animationDelay: "1.1s" }}
        className="flex translate-y-6 flex-wrap gap-[14px] opacity-0 animate-h2-in"
      >
        {/* primary (teal) */}
        <button
          type="button"
          onClick={onReview}
          className="relative inline-block cursor-pointer overflow-hidden rounded-xl border border-white/35 bg-[linear-gradient(180deg,#7ff5e1_0%,#2de2c8_48%,#0fa58f_52%,#0b7d6c_100%)] px-[26px] py-[14px] text-center text-xs font-bold uppercase leading-none tracking-[.16em] text-[#04211c] shadow-[inset_0_1px_0_rgba(255,255,255,.8),inset_0_-3px_6px_rgba(0,60,50,.45),0_8px_22px_rgba(45,226,200,.35)] transition-all duration-200
            before:absolute before:inset-x-[4%] before:top-[2px] before:h-[46%] before:rounded-[10px_10px_40px_40px] before:bg-[linear-gradient(180deg,rgba(255,255,255,.7),rgba(255,255,255,.05))] before:content-['']
            after:absolute after:left-[-70%] after:top-0 after:h-full after:w-[45%] after:-skew-x-[22deg] after:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.65),transparent)] after:content-[''] after:animate-sheen
            hover:-translate-y-[3px] hover:shadow-[inset_0_1px_0_rgba(255,255,255,.9),0_12px_30px_rgba(45,226,200,.6),0_0_24px_rgba(45,226,200,.5)]"
        >
          <span className="relative z-10">Request free review</span>
        </button>

        {/* glass */}
        <button
          type="button"
          onClick={() =>
            document
              .getElementById("services")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="relative inline-block cursor-pointer overflow-hidden rounded-xl border border-[#2de2c8]/60 bg-[linear-gradient(180deg,rgba(255,255,255,.22),rgba(255,255,255,.05)_50%,rgba(45,226,200,.14))] px-[26px] py-[14px] text-center text-xs font-bold uppercase leading-none tracking-[.16em] text-[#f4ead0] shadow-[inset_0_1px_0_rgba(255,255,255,.5),0_6px_18px_rgba(0,0,0,.35)] backdrop-blur-[6px] transition-all duration-200
            before:absolute before:inset-x-[4%] before:top-[2px] before:h-[46%] before:rounded-[10px_10px_40px_40px] before:bg-[linear-gradient(180deg,rgba(255,255,255,.28),transparent)] before:content-['']
            after:absolute after:left-[-70%] after:top-0 after:h-full after:w-[45%] after:-skew-x-[22deg] after:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.65),transparent)] after:content-[''] after:animate-sheen
            hover:-translate-y-[3px] hover:border-[#2de2c8] hover:shadow-[inset_0_1px_0_rgba(255,255,255,.7),0_10px_26px_rgba(45,226,200,.45),0_0_26px_rgba(45,226,200,.65)]"
        >
          <span className="relative z-10">Explore services</span>
        </button>
      </div>
    </div>
  </header>
);

export default ServicesHero;