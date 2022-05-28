module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        card: '0 1px 10px 0 hsla(210, 7%, 22%, .06), 0 2px 4px 0 hsla(210, 7%, 22%, .08)',
      },
      colors: {
        gray: {
          light: '#f9fafa',
          lighter: '#f2f5f8',
        },
        green: {
          nodejs: '#699f63',
        },
        theme: {
          text: '#2c3f51',
          primary: '#30849a',
        },
        border: {
          gray: '#d0d7de',
        },
        black: {
          default: '#151a1e',
        },
      },
    },
  },
  plugins: [],
}
