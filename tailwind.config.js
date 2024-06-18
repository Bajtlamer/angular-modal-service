/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1b1b1b',
        'secondary': '#2b2b2b'
      }
    },
  },
  plugins: [],
}