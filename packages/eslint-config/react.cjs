const { rules } = require("./rule-builder.cjs");

// For review: this rule composes poorly (because it requires additional
// configuration depending on which frameworks you're using). Should we just
// remove it rather than resorting to a rule builder for it?
const preventAbbreviations = rules["unicorn/prevent-abbreviations"]({
  react: true,
});

module.exports = {
  extends: [
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/configs/recommended.js
    // https://github.com/jsx-eslint/eslint-plugin-react#list-of-supported-rules
    "plugin:react/recommended",

    // https://github.com/facebook/react/blob/main/packages/eslint-plugin-react-hooks/src/index.js
    "plugin:react-hooks/recommended",
  ],
  rules: {
    ...preventAbbreviations.rules,
  },
  overrides: [...preventAbbreviations.overrides],
  settings: {
    react: {
      version: "detect",
    },
  },
};
