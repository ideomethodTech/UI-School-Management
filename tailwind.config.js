/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f5fbff",
          100: "#e6f3ff",
          300: "#7cc2ff",
          500: "#0ea5ff"
        }
      },
      boxShadow: {
        card: "0 6px 18px rgba(10,10,10,0.08)"
      }
    },
  },
  plugins: [],
};

export default config;
