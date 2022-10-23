/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      height: {
        13: '3.25rem',
        15: '3.75rem',
      },
      width: {
        15: '3.75rem',
        150: '37.5rem',
      },
      maxWidth: {
        320: '80rem',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.sticky-avoid-navbar': {
          position: 'sticky',
          top: '7.25rem',
        },
      });
    }),
  ],
};
