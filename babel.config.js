module.exports = {
  plugins: [
    [
      'prismjs',
      {
        languages: ['html'],

        // languages: allLanguages,
        plugins: ['line-numbers'],
        theme: 'okaidia',
        css: true,
      },
    ],
  ],
}
