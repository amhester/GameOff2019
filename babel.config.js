module.exports = function babelConfig({ cache }) {
  // Cache this config file during development
  if (cache) {
    cache.using(() => process.env.NODE_ENV === 'development');
  }

  const presets = [
    '@babel/preset-env',
  ];
  const plugins = [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-private-methods',
  ];

  return {
    presets,
    plugins,
  };
};
