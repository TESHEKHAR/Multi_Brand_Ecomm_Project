// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx,html}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",
  ],
  theme: {
    extend: {
      keyframes: {
        up: { to: { opacity: "1", transform: "none" } },
        hflow: { to: { backgroundPosition: "220% 0" } },
        grow: { to: { transform: "scaleX(1)" } },
        word: { to: { opacity: "1", filter: "none", transform: "none" } },
        slide: { to: { opacity: "1", filter: "none", transform: "none" } },
        btnin: {
          from: { opacity: "0", translate: "0 16px" },
          to: { opacity: "1", translate: "0 0" },
        },
        sheen: {
          "0%": { left: "-70%" },
          "28%, 100%": { left: "130%" },
        },
        pulse2: {
          "50%": { boxShadow: "0 0 34px rgba(45,226,200,.9)" },
        },
        /* ---- network section ---- */
        dash: { to: { strokeDashoffset: "-22" } },
        float: {
          "0%, 100%": { translate: "0 0" },
          "50%": { translate: "0 -10px" },
        },
        hubIn: {
          from: { transform: "translate(-50%,-50%) scale(.5)", opacity: "0" },
          to: { transform: "translate(-50%,-50%) scale(1)", opacity: "1" },
        },
        hubInM: {
          from: { transform: "scale(.5)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
        ping: {
          "0%": { transform: "scale(.92)", opacity: ".9" },
          "100%": { transform: "scale(1.4)", opacity: "0" },
        },
        ndrift: {
          from: { transform: "translate(0,0)" },
          to: { transform: "translate(260px,140px)" },
        },
        /* ---- difference + features ---- */
        drift: {
          to: { transform: "translate(-80px,60px) scale(1.2)" },
        },
        tick: { to: { strokeDashoffset: "0" } },
        /* ---- low-risk section ---- */
        lrUp: {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "none" },
        },
        lrRise: { to: { transform: "none" } },
        lrGrow: { to: { transform: "scaleY(1)" } },
        lrProg: { to: { transform: "scaleX(1)" } },
        lrOn: {
          to: {
            backgroundColor: "#2de2c8",
            borderColor: "#2de2c8",
            color: "#04211c",
          },
        },
        lrBob: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        lrSheen: {
          "0%": { left: "-60%" },
          "40%, 100%": { left: "130%" },
        },
        lrBeat: {
          "0%": { boxShadow: "0 0 0 0 rgba(45,226,200,.6)" },
          "70%, 100%": { boxShadow: "0 0 0 8px rgba(45,226,200,0)" },
        },
      },
      animation: {
        "h1-in":
          "up .9s .1s cubic-bezier(.2,.7,.2,1) forwards, hflow 7s linear infinite",
        "rule-in": "grow .8s .6s ease forwards",
        "h2-in": "up .8s .75s ease forwards",
        "word-in": "word .6s ease forwards",
        "slide-in": "slide .7s cubic-bezier(.2,.8,.2,1) forwards",
        "btn-in": "btnin .6s ease forwards",
        sheen: "sheen 6s infinite",
        pulse2: "pulse2 3s ease-in-out infinite",
        /* ---- network section ---- */
        eyebrow: "grow .9s cubic-bezier(.2,.8,.2,1) .15s forwards",
        dash: "dash 1.8s linear 1.6s infinite",
        float1: "float 4.5s ease-in-out 1.8s infinite",
        float2: "float 4.5s ease-in-out 2.8s infinite",
        float3: "float 4.5s ease-in-out 3.8s infinite",
        float4: "float 4.5s ease-in-out 4.8s infinite",
        "hub-in": "hubIn .9s cubic-bezier(.2,.8,.2,1) .1s both",
        "hub-in-m": "hubInM .9s cubic-bezier(.2,.8,.2,1) .1s both",
        ping1: "ping 3s ease-out 1.2s infinite",
        ping2: "ping 3s ease-out 2.7s infinite",
        ndrift: "ndrift 14s ease-in-out infinite alternate",
        /* ---- difference + features ---- */
        drift12: "drift 12s ease-in-out infinite alternate",
        drift14r: "drift 14s ease-in-out infinite alternate-reverse",
        tick: "tick .8s .1s forwards",
        /* ---- low-risk section (delay inline style se aata hai) ---- */
        "lr-up": "lrUp .9s cubic-bezier(.2,.7,.1,1) both",
        "lr-rise": "lrRise 1s cubic-bezier(.2,.7,.1,1) both",
        "lr-grow": "lrGrow 1.1s cubic-bezier(.2,.7,.1,1) both",
        "lr-prog": "lrProg 3.2s cubic-bezier(.2,.7,.1,1) both",
        "lr-on": "lrOn .4s both",
        "lr-bob": "lrBob 6s ease-in-out infinite",
        "lr-sheen": "lrSheen 6s ease-in-out infinite",
        "lr-beat": "lrBeat 1.8s infinite",
      },
    },
  },
  plugins: [],
};