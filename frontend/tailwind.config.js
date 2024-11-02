/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-blue": "#1fb6ff",
      },
      backgroundImage: {
        "app-bg":
          "url('https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fnoise-texture&psig=AOvVaw3S6cYeyZEPET292g59noS-&ust=1730527935956000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCIjRi4m9uokDFQAAAAAdAAAAABAJ')",
      },
      // Add custom utilities
      backgroundColor: {
        app: "#151515",
      },
      mixBlendMode: {
        overlay: "overlay",
      },
      fontFamily: {
        inter: ["'Inter'", "sans-serif"], // Add Inter font
        oswald: ["'Oswald'", "sans-serif"], // Add Oswald font
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
