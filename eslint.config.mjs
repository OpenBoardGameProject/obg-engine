import globals from "globals";
import tseslint from "typescript-eslint";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {
    languageOptions: {
      globals: globals.browser,
      parser: tseslint.parser
    }
  },
  {
    rules: {
      "quotes": ["error", "double", { avoidEscape: true }],
      "semi": ["error", "always"],
      "comma-dangle": ["error", "always-multiline"],
      "object-curly-spacing": ["error", "always"],
      "space-before-function-paren": ["error", "never"]
    }
  }
];