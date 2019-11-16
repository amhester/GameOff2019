module.exports = {
  root: true,
  env: {
    "es6": true
  },
  parserOptions: {
    ecmaVersion: 2018,
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
    'import/prefer-default-export': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: true,
    }],
  },
};
