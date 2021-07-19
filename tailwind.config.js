const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  mode: "jit",
  theme: {
    colors: {
      primary: "#EF6767",
      secondary: "#192564",
      gray: colors.coolGray,
      green: colors.green,
      rose: colors.rose,
      pink: colors.fuchsia,
      white: "#FFFFFF",
    },
    extend: {
      fontFamily: {
        poppins: ["Poppins"],
      },
      keyframes: {
        "slide-right": {
          "0%": {
            transform: "translateX(-20%)",
            opacity: 0,
          },
          "50%": {
            transform: "translateX(-20%)",
            opacity: 0,
          },
          "100%": {
            transform: "translateX(0%)",
            opacity: 1,
          },
        },
      },
      animation: {
        "slide-right-03": "slide-right 0.3s ease-out",
        "slide-right-06": "slide-right 0.6s ease-out",
        "slide-right-09": "slide-right 0.9s ease-out",
        "slide-right-12": "slide-right 1.2s ease-out",
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
