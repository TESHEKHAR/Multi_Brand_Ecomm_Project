import React, { useEffect, useRef, useState } from "react";

export const useInView = (threshold = 0.15) => {
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

const Reveal = ({ as: Tag = "div", delay = 0, className = "", children }) => {
  const [ref, shown] = useInView();
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

export const Icon = ({ children }) => (
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

export default Reveal;