/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        height: {

        },
        maxWidth: {
            "2700": "168.75rem",
            "247": "13rem"
        },
        colors: {
            "background": "#343A40",
            "afterBackground": "#71717A",
            "lightGrey": "#494E53"
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
