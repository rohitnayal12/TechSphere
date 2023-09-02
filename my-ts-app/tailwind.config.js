/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      purge: [],
      extend: {
        boxShadow: {
          '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
        }
      },
      fontFamily: {
        sans: ["Source Sans 3", "sans-serif"],
      },
      darkMode: false,
      theme: {
        extend: {},
      },
      variants: {
        extend: {},
      },
    },
    plugins: [],
  };