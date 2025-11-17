/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    // The line below might be redundant, but we'll keep it just in case
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f5fbff",
          100: "#e6f3ff",
          300: "#7cc2ff",
          500: "#0ea5ff",
        },
      },
      boxShadow: {
        card: "0 6px 18px rgba(10,10,10,0.08)",
      },
    },
  },
  plugins: [],
};