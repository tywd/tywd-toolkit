# @tywd/cli

TYWD 命令行工具，用于前端项目脚手架搭建和代码规范配置。

## 功能特性

- 🚀 项目初始化：快速创建基于不同技术栈的项目模板
- 📝 代码规范集成：一键集成 ESLint、Prettier、Stylelint、Commitlint 等规范工具
- 🔧 代码修复：自动扫描并修复存量代码中的规范问题

## 安装

```bash
# 全局安装
npm install -g @tywd/cli

# 或者使用 npx（推荐）
npx @tywd/cli create my-project
```

## 使用方法

### 创建新项目

```bash
# 交互式创建项目
tywd create my-project

# 或使用 npx
npx @tywd/cli create my-project
```

### 初始化代码规范

在现有项目中初始化代码规范配置：

```bash
# 进入项目目录
cd my-project

# 初始化代码规范
tywd init
```

### 修复代码规范问题

自动扫描并修复项目中的代码规范问题：

```bash
# 修复代码规范问题
tywd fix
```

## 支持的模板

- Vite + Vue 3 (JavaScript)
- Vite + Vue 3 (TypeScript)
- Qiankun 微前端子应用 (Vite)
- Qiankun 微前端子应用 (Webpack)

## 命令详情

### create

创建新项目，支持多种模板选择。

```bash
tywd create <project-name> [options]
```

选项：
- `-t, --template <template>`：指定模板类型
- `-d, --description <description>`：项目描述
- `-f, --force`：强制覆盖已存在的目录

### init

在现有项目中初始化代码规范配置。

```bash
tywd init [options]
```

选项：
- `-f, --force`：强制覆盖已存在的配置文件

### fix

自动扫描并修复项目中的代码规范问题。

```bash
tywd fix [options]
```

选项：
- `--eslint`：仅修复 ESLint 问题
- `--prettier`：仅修复 Prettier 问题
- `--stylelint`：仅修复 Stylelint 问题

## 配置文件

工具会自动生成以下配置文件：

- `.eslintrc.js`：ESLint 配置
- `.prettierrc`：Prettier 配置
- `.stylelintrc.js`：Stylelint 配置
- `commitlint.config.js`：Commitlint 配置
- `.husky/`：Git Hooks 配置
- `.lintstagedrc.js`：Lint Staged 配置

## 许可证

MIT