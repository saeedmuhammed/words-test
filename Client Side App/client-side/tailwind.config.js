/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'xs': '200px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        'main-color':'rgba(0,77,137,255)',
        
      }
    },
  },
  plugins: [],
}

