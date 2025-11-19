#!/usr/bin/env node

// TYWD CLI create 命令入口文件
// 该文件负责处理项目创建相关的命令行参数

const { Command } = require('commander');
const { createProject } = require('../lib/create');

// 创建命令实例
const program = new Command();

program
  // 设置命令名称
  .name('create')
  // 设置命令描述
  .description('Create a new project from templates')
  // 设置命令执行时的回调函数
  .action(createProject);

// 解析命令行参数
program.parse(process.argv);