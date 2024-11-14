/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'plugin:prettier/recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: ['import'],
  rules: {
    "prettier/prettier": "warning",
    // Enforce blank lines between code blocks
    'padding-line-between-statements': [
      'warn',
      { blankLine: 'always', prev: 'block-like', next: '*' },
      { blankLine: 'always', prev: '*', next: 'block-like' },
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: 'const', next: 'block-like' },
      { blankLine: 'always', prev: 'block-like', next: 'const' },
      { blankLine: 'always', prev: 'let', next: 'block-like' },
      { blankLine: 'always', prev: 'block-like', next: 'let' },
      { blankLine: 'always', prev: 'var', next: 'block-like' },
      { blankLine: 'always', prev: 'block-like', next: 'var' },
    ],
    'vue/max-attributes-per-line': [
      'warn',
      {
        singleline: {
          max: 1,
        },
        multiline: {
          max: 1,
        },
      },
    ],
    // Disallow blank lines between imports
    'import/order': [
      'error',
      {
        groups: [['builtin', 'external', 'internal']],
        'newlines-between': 'never', // Ensures no blank lines between imports
      },
    ],
  },
};
