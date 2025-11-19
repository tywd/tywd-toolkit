// ESLint 配置文件
// 使用 @tywd/shared-configs 中的共享配置

// 检查是否在 tywd-toolkit 工作区内
try {
  // 尝试加载工作区内的 shared-configs
  const sharedConfigs = require('@tywd/shared-configs/eslint/flat');
  
  module.exports = sharedConfigs;
} catch (error) {
  // 如果在工作区外，使用基本配置
  const globals = require('globals');
  
  module.exports = [
    {
      files: ['**/*.js', '**/*.vue'],
      languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        globals: {
          ...globals.browser,
          ...globals.node,
          ...globals.es2021,
        },
      },
      extends: [
        'eslint:recommended',
      ],
      rules: {}
    }
  ];
}