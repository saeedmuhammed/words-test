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
        'main-color':'#004d89',
        'right-answer':'#07bc0d',  
        'wrong-answer':'#e84c3d', 
        
      }
    },
  },
  plugins: [],
}

