const glassmorphism = {
  light: {
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.18)",
    backdropFilter: "blur(24px)"
  },

  dark: {
    background: "rgba(15,23,42,0.32)",
    border: "1px solid rgba(255,255,255,0.10)",
    backdropFilter: "blur(24px)"
  },

  premium: {
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.14), rgba(255,255,255,0.06))",

    border:
      "1px solid rgba(255,255,255,0.16)",

    backdropFilter:
      "blur(30px) saturate(180%)"
  }
};

export default glassmorphism;