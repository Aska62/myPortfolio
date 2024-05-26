/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    extend: {
      colors: {
        brightYellow: '#F4F74B',
        lightYellow: 'rgb(252, 252, 207)',
        wineRed: 'rgb(153, 11, 20)',
        lightWineRed: 'rgb(191, 105, 111)',
        softRed: 'rgb(224, 101, 112)',
        darkGray: 'rgb(105, 104, 104)',
        lightGray: 'rgb(194, 190, 190)',
      }
    },
  },
  plugins: [],
}

