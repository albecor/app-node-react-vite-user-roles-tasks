/** @type {import('tailwindcss').Config} */
//export default {    ///Esto viene así pero no funciona.                     
module.exports = {    ////Es necesario escribirlo así.
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

