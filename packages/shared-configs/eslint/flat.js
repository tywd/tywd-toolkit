/*
ESLint 扁平配置格式，用于 ESLint 9.0.0 及以上版本
使用配置对象数组
提供更好的性能和更灵活的配置选项
使用 languageOptions 替代 env 和 parserOptions
使用 plugins 对象直接引入插件
*/

const globals = require('globals');

module.exports = [
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx', '**/*.vue'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        parser: '@typescript-eslint/parser',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
      vue: require('eslint-plugin-vue'),
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'error',
    },
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: require('vue-eslint-parser'),
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.vue'],
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  },
];