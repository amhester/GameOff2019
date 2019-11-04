module.exports = function babelConfig({ cache }) {
  // Cache this config file during development
  if (cache) {
    cache.using(() => process.env.NODE_ENV === 'development');
  }

  const presets = [];
  const plugins = [
    // ['@babel/preset-env', {
    //   useBuiltIns: false,
    //   targets: {
    //     node: 'current',
    //   },
    // }],
    // 'transform-object-rest-spread',
  ];

  return {
    presets,
    plugins,
  };
};
