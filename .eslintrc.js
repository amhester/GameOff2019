module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint"
  },
  extends: [
    "airbnb-base",
  ],
  plugins: [
  ],
  rules: {
    "arrow-parens": [ "error", "as-needed"],
    "max-len": "off",
    "no-console": "off",
    "semi": [ "error", "never" ]
  },
};
