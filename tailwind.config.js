/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./node_modules/flowbite-react/**/*.js","./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "sf-green": {
          50: "#f2f8ed",
          100: "#e2f0d7",
          200: "#c7e2b4",
          300: "#a3ce88",
          400: "#83b962",
          500: "#6dab4a",
          600: "#4c7d33",
          700: "#3c602b",
          800: "#324e26",
          900: "#2d4324",
        },
      },
      fontFamily: {
        rubik: ["Rubik 80s Fade"],
      },
      gridTemplateColumns: {
        14: "repeat(14, minmax(0, 1fr))",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp"), require('flowbite/plugin')],
};
