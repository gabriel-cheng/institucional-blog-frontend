/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        maxWidth: {
            "2700": "168.75rem",
            "247": "13rem",
            "320px": "16rem"
        },
        width: {
            "500px": "31.25rem",
        },
        colors: {
            "city-green": "#e8ff01",
            "city-blue": "#2a43ff",
            "modalBg": "#000000a1"
        },
        zIndex: {
            '2': '2'
        },
        boxShadow: {
            'default': '0 0 8px'
        }
    },
  },
  plugins: [],
}
