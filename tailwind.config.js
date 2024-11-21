/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        "black": "url('/src/img/black.jpg')"
      }
    },
  },
  plugins: [],
}

