#!/usr/bin/env node

// TYWD CLI init 命令入口文件
// 该文件负责处理代码规范初始化相关的命令行参数

const { Command } = require('commander');
const { initLinting } = require('../lib/init');

// 创建命令实例
const program = new Command();

program
  // 设置命令名称
  .name('init')
  // 设置命令描述
  .description('Initialize linting configurations in current project')
  // 设置命令执行时的回调函数
  .action(initLinting);

// 解析命令行参数
program.parse(process.argv);