module.exports = {
  extends: [
    // https://github.com/sindresorhus/eslint-plugin-unicorn
    "plugin:unicorn/recommended",
  ],
  rules: {
    "unicorn/no-null": "off",
    "unicorn/prevent-abbreviations": "off",
  },
  overrides: [
    // Avoid imposing on Expo templates (as it complains about "App.tsx")
    {
      files: ["templates/**/*"],
      rules: {
        "unicorn/filename-case": "off",
      },
    },
  ],
};
