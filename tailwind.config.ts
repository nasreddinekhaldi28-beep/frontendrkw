import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#1E3A8A",
          "blue-light": "#2D4ED8",
          "blue-dark": "#1E2F6B",
          gold: "#D97706",
          "gold-light": "#F59E0B",
          green: "#10B981",
          "green-dark": "#059669",
        },
      },
      fontFamily: {
        cairo: ["var(--font-cairo)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(16, 24, 40, 0.04), 0 8px 24px -12px rgba(30, 58, 138, 0.18)",
        card: "0 1px 3px rgba(16, 24, 40, 0.06), 0 18px 40px -20px rgba(30, 58, 138, 0.28)",
        "card-hover": "0 2px 6px rgba(16, 24, 40, 0.08), 0 28px 60px -24px rgba(30, 58, 138, 0.38)",
        cta: "0 10px 24px -8px rgba(16, 185, 129, 0.5)",
        "cta-hover": "0 16px 32px -10px rgba(16, 185, 129, 0.6)",
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(1200px 400px at 100% -10%, rgba(45, 78, 216, 0.06), transparent 60%)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      animation: {
        "slide-in-right": "slideInRight 0.38s cubic-bezier(0.16, 1, 0.3, 1)",
        "fade-in": "fadeIn 0.25s ease-out",
        "pop-in": "popIn 0.32s cubic-bezier(0.16, 1, 0.3, 1)",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-soft": "floatSoft 4s ease-in-out infinite",
      },
      keyframes: {
        slideInRight: {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        popIn: {
          "0%": { opacity: "0", transform: "translateY(12px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        floatSoft: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
