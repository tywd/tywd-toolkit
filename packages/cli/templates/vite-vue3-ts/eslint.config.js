// ESLint 配置文件
// 使用 @tywd/shared-configs 中的共享配置

// 检查是否在 tywd-toolkit 工作区内
try {
  // 尝试加载工作区内的 shared-configs
  module.exports = require('@tywd/shared-configs/eslint');
} catch (error) {
  // 如果在工作区外，使用基本配置
  module.exports = {
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    extends: [
      'eslint:recommended',
    ],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {}
  };
}