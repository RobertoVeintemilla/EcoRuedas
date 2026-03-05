/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#0df20d",
        "background-light": '#f5f8f5',
        "background-dark": '#102210',
      },
      fontFamily: {
        'display': ['Inter'],
      },
      borderRadius: {
        "DEFAULT": "1REM", "lg": "2rem", "xl": "3rem", "full": "9999px",
      },
    },
    plugins: [],
    darkmode: 'class',
  }
}