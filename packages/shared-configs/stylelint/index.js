// Stylelint配置文件
// 该配置用于检查和格式化CSS/SCSS文件
module.exports = {
  // 扩展配置
  extends: [
    // Stylelint标准规则
    'stylelint-config-standard',
    // Prettier规则，用于禁用与Prettier冲突的Stylelint规则
    'stylelint-config-prettier'
  ],
  // 自定义规则
  rules: {
    // 允许未知的at规则（用于支持Tailwind CSS等框架）
    'at-rule-no-unknown': [
      true,
      {
        // 忽略的at规则列表
        ignoreAtRules: [
          // Tailwind CSS规则
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
          // Sass规则
          'function',
          'if',
          'each',
          'include',
          'mixin',
        ],
      },
    ],
    // 允许声明块末尾不加分号
    'declaration-block-trailing-semicolon': null,
    // 允许选择器特异性降序排列
    'no-descending-specificity': null,
  },
};