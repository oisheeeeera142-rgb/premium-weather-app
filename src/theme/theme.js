import colors from "./colors";
import typography from "./typography";
import shadows from "./shadows";
import glassmorphism from "./glassmorphism";

const theme = {
  colors,
  typography,
  shadows,
  glassmorphism,

  borderRadius: {
    xs: "10px",
    sm: "14px",
    md: "20px",
    lg: "28px",
    xl: "36px",
    full: "999px"
  },

  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px"
  },

  transitions: {
    fast: "0.15s ease",
    normal: "0.3s ease",
    slow: "0.5s ease"
  },

  zIndex: {
    background: 0,
    content: 10,
    header: 20,
    overlay: 30,
    modal: 40,
    toast: 50
  }
};

export default theme;