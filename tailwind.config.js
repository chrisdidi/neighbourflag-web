const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: "#EF6767",
      secondary: "#1D4E7C",
      gray: colors.coolGray,
      green: colors.green,
      blue: colors.lightBlue,
      rose: colors.rose,
      pink: colors.fuchsia,
      white: "#FFFFFF",
    },
    extend: {
      fontFamily: {
        poppins: ["Poppins"],
      },
    },
  },
  variants: {
    extend: {
      width: ["group-hover"],
    },
  },
  plugins: [],
};
