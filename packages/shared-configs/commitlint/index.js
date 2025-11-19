// Commitlint配置文件
// 该配置用于检查Git提交信息的格式
module.exports = {
  // 扩展配置
  extends: [
    // 使用conventional commit规范
    '@commitlint/config-conventional'
  ],
  // 自定义规则
  rules: {
    // 提交类型枚举规则
    'type-enum': [
      // 错误级别：2表示错误
      2,
      // 应用时机：always表示总是应用
      'always',
      // 允许的提交类型列表
      [
        'build',    // 构建相关
        'chore',    // 日常维护
        'ci',       // CI/CD相关
        'docs',     // 文档更新
        'feat',     // 新功能
        'fix',      // 修复bug
        'perf',     // 性能优化
        'refactor', // 代码重构
        'revert',   // 回滚提交
        'style',    // 代码样式调整
        'test',     // 测试相关
      ],
    ],
    // 提交类型大小写规则
    'type-case': [2, 'always', 'lower-case'],
    // 提交类型不能为空
    'type-empty': [2, 'never'],
    // 提交范围不能为空
    'scope-empty': [2, 'never'],
    // 提交主题不能为空
    'subject-empty': [2, 'never'],
    // 提交主题不能以句号结尾
    'subject-full-stop': [2, 'never', '.'],
    // 提交主题最大长度
    'subject-max-length': [2, 'always', 100],
  },
};