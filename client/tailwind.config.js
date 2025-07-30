/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
        warm: {
          50: '#fef7ee',
          100: '#fdedd4',
          200: '#fbd7a8',
          300: '#f8bb71',
          400: '#f59538',
          500: '#f2751a',
          600: '#e35a0f',
          700: '#bc4310',
          800: '#963614',
          900: '#792e14',
        },
        wood: {
          50: '#fdf8f3',
          100: '#fbe8d9',
          200: '#f6d0b3',
          300: '#f0b280',
          400: '#e88d4d',
          500: '#e2752a',
          600: '#d35e1f',
          700: '#af471c',
          800: '#8c3a1e',
          900: '#72321c',
        }
      }
    },
  },
  plugins: [],
} 