module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      dblue: "#151E3F",
      dblueblack: "#030027",
      yellow: "#E4E5C3",
      orange: "#DC9E82",
      rose: "#B47272",
    },
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
      serif: ["Arvo", "serif"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
