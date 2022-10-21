/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      height: {
        13: '3.25rem',
      },
      width: {
        150: '37.5rem',
      },
      maxWidth: {
        320: '80rem',
      },
    },
  },
  plugins: [],
};
