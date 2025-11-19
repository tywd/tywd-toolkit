#!/usr/bin/env node

// TYWD CLI fix 命令入口文件
// 该文件负责处理代码修复相关的命令行参数

const { Command } = require('commander');
const { fixLinting } = require('../lib/fix');

// 创建命令实例
const program = new Command();

program
  // 设置命令名称
  .name('fix')
  // 设置命令描述
  .description('Scan and fix linting issues in current project')
  // 设置命令执行时的回调函数
  .action(fixLinting);

// 解析命令行参数
program.parse(process.argv);