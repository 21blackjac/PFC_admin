/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}", // Important for React
    ],
    theme: {
      extend: {},
    },
    plugins: [require('daisyui')], // if you're using DaisyUI
  };