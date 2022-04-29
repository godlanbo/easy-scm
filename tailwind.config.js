module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        card: '0 1px 10px 0 hsla(210, 7%, 22%, .06), 0 2px 4px 0 hsla(210, 7%, 22%, .08)',
      },
      colors: {
        theme: {
          text: '#2c3f51',
          primary: '#30849a',
        },
      },
    },
  },
  plugins: [],
}
