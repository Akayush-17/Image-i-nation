/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./src/components/**/*.{html,js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      backgroundColor: {
        'custom-color': '#ff0000',
      },
    },
  },
  plugins: [],
}
