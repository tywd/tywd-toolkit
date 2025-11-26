#!/usr/bin/env node

// TYWD CLI 工具主入口文件
// 该文件负责注册所有可用的子命令

const { program } = require('commander');
const { version } = require('../package.json');

program
  // 设置 CLI 工具版本号
  .version(version)
  // 设置 CLI 工具描述信息
  .description('TYWD CLI Tool for frontend project scaffolding and linting')
  // 注册 create 命令，用于创建新项目
  .command('create', 'Create a new project from templates', { executableFile: 'create' })
  // 注册 init 命令，用于初始化代码规范配置
  .command('init', 'Initialize linting configurations in current project', { executableFile: 'init' })
  // 注册 fix 命令，用于扫描和修复代码问题
  .command('fix', 'Scan and fix linting issues in current project', { executableFile: 'fix' });

// 解析命令行参数
program.parse(process.argv);