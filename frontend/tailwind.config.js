/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        zoomIn: "zoomIn 10s ease-in-out infinite",
        fadeIn: "fadeIn 1s ease-out forwards",
        fadeInUp: "fadeInUp 1s ease-out forwards",
        fadeInAndSlideUp: "fadeInAndSlideUp 1s ease-out forwards",
      },
      keyframes: {
        zoomIn: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInAndSlideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      }, // Add the missing comma here
      colors: {
        "custom-blue": "#1fb6ff",
      },
      backgroundImage: {
        "app-bg": "url('https://www.istockphoto.com/photos/noise-texture')",
      },
      backgroundColor: {
        app: "#151515",
      },
      mixBlendMode: {
        overlay: "overlay",
      },
      fontFamily: {
        inter: ["'Inter'", "sans-serif"],
        oswald: ["'Oswald'", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
