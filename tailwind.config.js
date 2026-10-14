/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"EB Garamond"', 'Georgia', 'serif'],
        cinzel: ['Cinzel', 'Trajan Pro', 'serif'],
        sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Text"', 'sans-serif'],
      },
      colors: {
        paper: {
          50: '#FDFBF7',
          100: '#FAF6EE',
          200: '#F4ECE1',
          300: '#E8DCC9',
          900: '#1C1917',
        },
        canon: {
          gold: '#C5A059',
          burgundy: '#5B1414',
          navy: '#0F172A',
        }
      }
    },
  },
  plugins: [],
}
