module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    '@antfu',
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2021,
  },
  plugins: [],
  rules: {},
}
