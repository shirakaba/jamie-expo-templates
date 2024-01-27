module.exports = {
  extends: [
    // https://github.com/francoismassart/eslint-plugin-tailwindcss/tree/master
    "plugin:tailwindcss/recommended",
  ],
  settings: {
    tailwindcss: {
      callees: ["tw"],
    },
  },
};
