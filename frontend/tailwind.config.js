/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "app-bg":
          "url('https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Fphotos%2Fnoise-texture&psig=AOvVaw3S6cYeyZEPET292g59noS-&ust=1730527935956000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCIjRi4m9uokDFQAAAAAdAAAAABAE')",
      },
      colors: {
        appColor: "#3c3f45", // Custom color
      },
      // Add custom utilities
      backgroundColor: {
        app: "#3c3f45",
      },
      mixBlendMode: {
        overlay: "overlay",
      },
    },
  },
  plugins: [],
};
