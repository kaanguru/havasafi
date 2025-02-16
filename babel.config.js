module.exports = function (api) {
  api.cache(true);
  const plugins = [
    [
      'module-resolver',
      {
        root: ['./'], // or ['.', './src'] depending on your project structure
        alias: {
          '~': './',
        },
      },
    ],
  ];

  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],

    plugins,
  };
};
