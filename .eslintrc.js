module.exports = {
  root: true,
  env: {
    "es6": true
  },
  parserOptions: {
    ecmaVersion: 2017,
    parser: 'babel-eslint'
  },
  extends: [
    'airbnb-base',
  ],
  plugins: [
  ],
  rules: {
    'arrow-parens': [ 'error', 'as-needed'],
    'no-console': 'off',
    'max-len': 'off',
    'no-param-reassign': 'off',
  },
};
