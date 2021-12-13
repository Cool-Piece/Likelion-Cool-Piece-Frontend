module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    semi: "error",
    quotes: ["error", "double"],
    "eol-last": "error",
    "no-trailing-spaces": "error",
    indent: ["error", 2],
    "spaced-comment": ["error", "always"],
    "no-unused-vars": "warn",
    "no-multiple-empty-lines": [
      "error",
      {
        max: 1,
        maxEOF: 0,
        maxBOF: 0,
      },
    ],
  },
};
