/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        serif:['Inter','serif'],
      },
      colors:{
        customBlue:{
          dark:'#17252a',
          medium:'#2b7a78',
          light:'#3aafa9',
        },
        customGray:{
          dark:'#def2f1',
          light:'#feffff',
        }
      }
    },
  },
  plugins: [],
}

