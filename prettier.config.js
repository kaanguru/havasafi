module.exports = {
  printWidth: 100,
  tabWidth: 2,
  singleQuote: true,
  bracketSameLine: true,
  trailingComma: 'es5',
  arrowParens: 'always',
  bracketSpacing: true,
  jsxBracketSameLine: true,
  parser: 'typescript',
  endOfLine: 'auto',

  plugins: [require.resolve('prettier-plugin-tailwindcss')],
  tailwindAttributes: ['className'],

  overrides: [
    {
      files: '**/*.md',
      options: {
        printWidth: 80,
      },
    },
    {
      files: '**/*.json',
      options: {
        tabWidth: 2,
      },
    },
  ],
};
