/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        hind: ["Hind Madurai", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
        open_sans: ["Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
