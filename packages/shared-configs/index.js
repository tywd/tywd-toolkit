// 统一导出所有共享配置
// 该文件作为共享配置包的入口文件，导出所有可用的配置模块
module.exports = {
  // 导出ESLint配置模块
  eslint: require('./eslint'),
  // 导出Prettier配置模块
  prettier: require('./prettier'),
  // 导出Stylelint配置模块
  stylelint: require('./stylelint'),
  // 导出Commitlint配置模块
  commitlint: require('./commitlint'),
};