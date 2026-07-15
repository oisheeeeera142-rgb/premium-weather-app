/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",

  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],

  theme: {
    extend: {
      colors: {
        primary: "#6BA6FF",
        secondary: "#A78BFA",

        surface: "#10131D",
        card: "#171B27",

        success: "#34D399",
        warning: "#FBBF24",
        danger: "#F87171",

        glass: "rgba(255,255,255,0.08)"
      },

      backdropBlur: {
        xs: "2px"
      },

      borderRadius: {
        weather: "32px"
      },

      boxShadow: {
        weather:
          "0 20px 60px rgba(0,0,0,0.25)",

        glow:
          "0 0 40px rgba(107,166,255,0.35)"
      },

      backgroundImage: {
        weatherGradient:
          "linear-gradient(135deg,#6BA6FF 0%,#7C8BFF 50%,#A78BFA 100%)",

        nightGradient:
          "linear-gradient(180deg,#0B1020 0%,#111827 50%,#1F2937 100%)",

        rainGradient:
          "linear-gradient(180deg,#273449 0%,#1E293B 100%)"
      }
    }
  },

  plugins: []
};