/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        customWarm:{
          light:"#fbe8a6",
          dark:"#f4976c",
        },
        customCool:{
          light:'#d2fdff',
          medium:'#b4dfe5',
          dark:'#303c6c',
        }
      }
    },
  },
  plugins: [],
}

