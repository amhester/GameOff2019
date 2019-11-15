module.exports = {
  root: true,
  env: {
    'es6': true
  },
  parserOptions: {
    ecmaVersion: 2017,
    parser: 'babel-eslint',
  },
  extends: [
    'airbnb-base',
  ],
  plugins: [
  ],
  rules: {
    'arrow-parens': [ 'error', 'as-needed'],
    'max-len': 'off',
    'no-param-reassign': 'off',
    'no-console': 'off',
    'class-methods-use-this': 'off'
  },
};
