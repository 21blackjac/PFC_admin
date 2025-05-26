/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html", // or ./public/index.html if it's in public
    "./src/**/*.{js,jsx,ts,tsx}", // adjust this based on your project structure
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

