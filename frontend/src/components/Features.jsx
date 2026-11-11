import React, { useState } from "react";
import Reveal, { Icon } from "./Reveal";

const FEATURES = [
  {
    title: "Complimentary procurement review",
    text: "We study your suppliers, pricing, products and areas of expense with no upfront consulting fee.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v10M9.5 9.5c0-1 1-1.7 2.5-1.7s2.5.7 2.5 1.7-1 1.5-2.5 1.8-2.5.8-2.5 1.9 1 1.8 2.5 1.8 2.5-.8 2.5-1.8" />
      </>
    ),
  },
  {
    title: "National buying power",
    text: "National contracts, supplier relationships and combined volume work in your favor.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
      </>
    ),
  },
  {
    title: "Customized purchasing strategy",
    text: "A tailored plan with savings opportunities across the products and services you buy.",
    icon: (
      <>
        <path d="M4 6h16M4 12h10M4 18h6" />
        <path d="M17 15l2 2 3-4" />
      </>
    ),
  },
  {
    title: "Savings put into action",
    text: "We help implement the savings, and our success is measured by the savings we create for you.",
    icon: (
      <>
        <path d="M3 17l6-6 4 4 8-9" />
        <path d="M15 6h6v6" />
      </>
    ),
  },
];

const SPEND = [
  "Products and supplies",
  "Services",
  "Equipment",
  "Not sure yet",
];

const inputCls = (bad) =>
  `w-full rounded-[10px] border bg-[#0a1311]/70 px-[14px] py-3 text-[15px] text-[#f4ead0] transition-all duration-200
   focus:border-[#2de2c8] focus:outline-none focus:shadow-[0_0_0_3px_rgba(45,226,200,.2),0_0_18px_rgba(45,226,200,.3)] ${
     bad ? "border-[#ff6b6b]" : "border-white/20"
   }`;

const labelCls =
  "mb-1.5 block text-xs uppercase tracking-[.08em] text-[#b9c2b6]";

const Features = () => {
  const [form, setForm] = useState({
    company: "",
    name: "",
    email: "",
    spend: SPEND[0],
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: false }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const next = {
      company: !form.company.trim(),
      name: !form.name.trim(),
      email: !/^\S+@\S+\.\S+$/.test(form.email.trim()),
    };
    setErrors(next);
    if (Object.values(next).some(Boolean)) {
      const first = ["company", "name", "email"].find((k) => next[k]);
      document.getElementById(`f-${first}`)?.focus();
      return;
    }

    // TODO: yahan apni API / backend call lagao, e.g.
    // await axios.post("/api/review-request", form);
    setSent(true);
  };

  return (
    <section
      id="review"
      aria-labelledby="feat-h"
      className="relative overflow-clip bg-[#0a1311] px-[6vw] py-[90px] text-[#f4ead0]
        before:pointer-events-none before:absolute before:-bottom-[140px] before:-left-40 before:h-[480px] before:w-[480px] before:bg-[radial-gradient(circle,rgba(45,226,200,.18),transparent_65%)] before:content-[''] before:animate-drift14r"
    >
      <div className="relative mx-auto max-w-[1100px]">
        <Reveal
          as="p"
          className="text-xs font-bold uppercase tracking-[.3em] text-[#2de2c8]"
        >
          What you get
        </Reveal>

        <Reveal
          as="h2"
          className="mb-[14px] mt-3 text-[clamp(26px,3.4vw,42px)] leading-[1.1] text-[#f4ead0]"
        >
          <span id="feat-h">
            Procurement savings,{" "}
            <em className="bg-[linear-gradient(100deg,#7ff5e1,#3b9bff,#8b6bff)] bg-clip-text not-italic text-transparent">
              without the upfront risk
            </em>
          </span>
        </Reveal>

        <Reveal
          as="p"
          className="max-w-[720px] text-[17px] leading-[1.7] text-[#b9c2b6]"
        >
          Every engagement starts with a complimentary procurement review. We
          find the opportunities first, then put the savings into action with
          you.
        </Reveal>

        <div className="mt-10 grid items-start gap-10 min-[821px]:grid-cols-[1.05fr_.95fr]">
          {/* ---------- features ---------- */}
          <div className="grid gap-4">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.12}>
                <div className="flex gap-4 rounded-2xl border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,.08),rgba(255,255,255,.02))] p-5 transition-all duration-300 hover:translate-x-2 hover:border-[#2de2c8] hover:shadow-[0_0_28px_rgba(45,226,200,.22)]">
                  <Icon>{f.icon}</Icon>
                  <div>
                    <h3 className="mb-1 text-[17px] font-bold">{f.title}</h3>
                    <p className="text-[15px] leading-[1.6] text-[#b9c2b6]">
                      {f.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* ---------- form ---------- */}
          <Reveal className="min-[821px]:sticky min-[821px]:top-5">
            <div className="rounded-[22px] border border-[#2de2c8]/45 bg-[linear-gradient(160deg,rgba(255,255,255,.1),rgba(45,226,200,.05))] p-[30px] shadow-[0_0_40px_rgba(45,226,200,.12)]">
              {!sent ? (
                <>
                  <h3 className="mb-1.5 text-[22px] font-bold">
                    Request your free review
                  </h3>
                  <p className="mb-[18px] text-sm text-[#b9c2b6]">
                    Tell us a little about your business. No upfront consulting
                    fee.
                  </p>

                  <form onSubmit={onSubmit} noValidate>
                    <div className="mb-[14px]">
                      <label htmlFor="f-company" className={labelCls}>
                        Company
                      </label>
                      <input
                        id="f-company"
                        name="company"
                        autoComplete="organization"
                        value={form.company}
                        onChange={onChange}
                        aria-invalid={errors.company || undefined}
                        className={inputCls(errors.company)}
                      />
                    </div>

                    <div className="mb-[14px]">
                      <label htmlFor="f-name" className={labelCls}>
                        Your name
                      </label>
                      <input
                        id="f-name"
                        name="name"
                        autoComplete="name"
                        value={form.name}
                        onChange={onChange}
                        aria-invalid={errors.name || undefined}
                        className={inputCls(errors.name)}
                      />
                    </div>

                    <div className="mb-[14px]">
                      <label htmlFor="f-email" className={labelCls}>
                        Work email
                      </label>
                      <input
                        id="f-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={onChange}
                        aria-invalid={errors.email || undefined}
                        className={inputCls(errors.email)}
                      />
                    </div>

                    <div className="mb-[14px]">
                      <label htmlFor="f-spend" className={labelCls}>
                        Main spend area
                      </label>
                      <select
                        id="f-spend"
                        name="spend"
                        value={form.spend}
                        onChange={onChange}
                        className={inputCls(false)}
                      >
                        {SPEND.map((o) => (
                          <option
                            key={o}
                            value={o}
                            className="bg-[#0a1311] text-[#f4ead0]"
                          >
                            {o}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-[14px]">
                      <label htmlFor="f-message" className={labelCls}>
                        Anything we should know?
                      </label>
                      <textarea
                        id="f-message"
                        name="message"
                        rows={3}
                        value={form.message}
                        onChange={onChange}
                        className={inputCls(false)}
                      />
                    </div>

                    <button
                      type="submit"
                      className="relative mt-1.5 w-full cursor-pointer overflow-hidden rounded-xl border border-[#2de2c8]/60 bg-[linear-gradient(180deg,rgba(255,255,255,.22),rgba(255,255,255,.05)_50%,rgba(45,226,200,.14))] px-[26px] py-[14px] text-center text-xs font-bold uppercase leading-none tracking-[.16em] text-[#f4ead0] shadow-[inset_0_1px_0_rgba(255,255,255,.5),0_6px_18px_rgba(0,0,0,.35)] backdrop-blur-[6px] transition-all duration-200
                        before:absolute before:inset-x-[4%] before:top-[2px] before:h-[46%] before:rounded-[10px_10px_40px_40px] before:bg-[linear-gradient(180deg,rgba(255,255,255,.28),transparent)] before:content-['']
                        hover:-translate-y-[3px] hover:border-[#2de2c8] hover:shadow-[inset_0_1px_0_rgba(255,255,255,.7),0_10px_26px_rgba(45,226,200,.45),0_0_26px_rgba(45,226,200,.65)] active:translate-y-0
                        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#2de2c8]"
                    >
                      <span className="relative z-10">Request free review</span>
                    </button>
                  </form>
                </>
              ) : (
                <div role="status" className="py-6 text-center">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="mx-auto h-16 w-16 animate-tick fill-none stroke-[#2de2c8] [filter:drop-shadow(0_0_10px_#2de2c8)] [stroke-dasharray:60] [stroke-dashoffset:60] [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:3]"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <h3 className="mt-3 text-[22px] font-bold">Thank you</h3>
                  <p className="mt-1.5 text-[#b9c2b6]">
                    We will be in touch about your complimentary procurement
                    review.
                  </p>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Features;