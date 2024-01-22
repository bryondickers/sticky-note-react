/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    colors: {
      primaryBlue: "hsl(var(--primary-blue))",
      blueHover: "hsl(var(--blue-hover))",
      white: "hsl(var(--white))",
      dark: "hsl(var(--dark))",
      grey: "hsl(var(--grey))",
      greenShade: "hsl(var(--green-shade))",
      peachShade: "hsl(var(--peach-shade))",
      yellowShade: "hsl(var(--yellow-shade))",
      pinkShade: "hsl(var(--pink-shade))",
    },
    extend: {
      backgroundColor: {
        "transparent-grey": "hsla( 0, 2%, 44%,0.6)",
      },
    },
  },
  plugins: [],
};
