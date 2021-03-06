module.exports = {
  
  future: {
    removeDeprecatedGapUtilities:true
  },
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fill: (theme) =>({
      red:theme("colors.red.primary")
    }),
    extend: {
      colors: {
        white:"#ffffff",
        blue: {
          medium:"#005c98",
          faded:"#00000059"
        },
        gray: {
          base:"#616161",
          background:"#fafafa",
          primary:"#dbdbd"
        },
        red: {
          primary:"#ed4956"
        },
        black: {
          light:"#262626",
          faded:"#00000059"
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
