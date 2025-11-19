# TYWD Toolkit 实现文档

## 项目架构设计

TYWD Toolkit 采用 Monorepo 架构，使用 Lerna 和 pnpm 进行包管理。项目分为两个主要包：

1. `@tywd/shared-configs`：统一配置包，包含 ESLint、Prettier、Stylelint 和 Commitlint 的配置
2. `@tywd/cli`：命令行工具包，提供 create、init 和 fix 命令

### 技术选型

- **包管理**：Lerna + pnpm
- **代码规范**：ESLint + Prettier + Stylelint + Commitlint
- **CLI 框架**：Commander.js
- **交互式提示**：Inquirer
- **文件操作**：fs-extra
- **子进程执行**：execa

## 核心功能实现

### 1. 项目脚手架 (create 命令)

#### 功能描述
create 命令用于交互式创建新项目，支持多种模板选择。

#### 实现细节
1. 使用 Inquirer 提供交互式命令行界面
2. 支持选择项目模板（Vite + Vue 3 JavaScript/TypeScript）
3. 自动创建项目目录结构
4. 生成基础文件（package.json、index.html、main.js/ts、App.vue 等）
5. 可选自动安装依赖

#### 代码结构
- `packages/cli/bin/create.js`：create 命令入口
- `packages/cli/lib/create.js`：create 命令核心逻辑
- `packages/cli/templates/`：项目模板文件

### 2. 规范初始化 (init 命令)

#### 功能描述
init 命令用于在现有项目中初始化代码规范配置。

#### 实现细节
1. 检查项目根目录是否存在 package.json
2. 生成 ESLint 配置文件 (.eslintrc)
3. 生成 Prettier 配置文件 (.prettierrc)
4. 生成 Stylelint 配置文件 (.stylelintrc)
5. 生成 Commitlint 配置文件 (commitlint.config.js)
6. 配置 Husky Git hooks
7. 生成 lint-staged 配置文件 (.lintstagedrc)

#### 代码结构
- `packages/cli/bin/init.js`：init 命令入口
- `packages/cli/lib/init.js`：init 命令核心逻辑

### 3. 代码修复 (fix 命令)

#### 功能描述
fix 命令用于扫描并自动修复项目中的代码规范问题。

#### 实现细节
1. 执行 ESLint 自动修复
2. 执行 Prettier 格式化
3. 执行 Stylelint 自动修复
4. 提供友好的进度提示

#### 代码结构
- `packages/cli/bin/fix.js`：fix 命令入口
- `packages/cli/lib/fix.js`：fix 命令核心逻辑

## 配置包实现

### @tywd/shared-configs

该包提供统一的代码规范配置，可被其他项目直接引用。

#### ESLint 配置
- 支持 Vue 3 和 TypeScript
- 集成 Prettier 规则
- 关闭 Vue 组件名必须多个单词的规则
- 对 TypeScript 的 any 类型发出警告

#### Prettier 配置
- 设置行宽为 100 字符
- 使用单引号
- 末尾添加逗号
- 箭头函数参数不添加括号

#### Stylelint 配置
- 基于 stylelint-config-standard
- 集成 Prettier 规则
- 忽略 Tailwind CSS 等框架的特殊 at-rule
- 关闭分号检查

#### Commitlint 配置
- 基于 conventional commit 规范
- 支持常见的提交类型（feat、fix、docs 等）
- 限制提交信息长度
- 要求提交类型为小写

## CLI 工具实现详解

### 主命令入口 (tywd.js)

主命令入口文件负责注册所有子命令：
- create：项目脚手架命令
- init：规范初始化命令
- fix：代码修复命令

### create 命令实现

create 命令实现在 `lib/create.js` 中，主要功能包括：
1. 交互式询问用户项目配置
2. 检查目标目录是否存在
3. 复制模板文件或创建基础项目结构
4. 更新 package.json 信息
5. 可选安装依赖

### init 命令实现

init 命令实现在 `lib/init.js` 中，主要功能包括：
1. 检查当前目录是否为项目根目录
2. 生成各类 lint 配置文件
3. 配置 husky Git hooks
4. 生成 lint-staged 配置

### fix 命令实现

fix 命令实现在 `lib/fix.js` 中，主要功能包括：
1. 执行 ESLint 自动修复
2. 执行 Prettier 格式化
3. 执行 Stylelint 自动修复
4. 提供友好的进度提示

## 集成 Husky 和 Commitlint

通过 Husky 集成 Git hooks，确保代码提交符合规范：

1. **commit-msg hook**：检查提交信息格式
2. **pre-commit hook**：提交前自动修复代码问题
3. **lint-staged**：仅对暂存区文件执行 lint 操作

## 项目模板

项目提供两种基础模板：

1. **Vite + Vue 3 JavaScript 模板**
2. **Vite + Vue 3 TypeScript 模板**

模板包含：
- 基础的 package.json 配置
- index.html 入口文件
- src/main.js 或 src/main.ts 入口文件
- src/App.vue 根组件
- vite.config.js 或 vite.config.ts 配置文件

### 模板创建与修复流程

在项目开发过程中，我们发现模板中存在一些问题并进行了修复：

1. **初始模板创建**：
   - 创建了 JavaScript 和 TypeScript 两种模板
   - 包含了基本的项目结构和文件
   - 使用 EJS 模板语法支持动态内容替换

2. **模板问题发现**：
   - 在测试过程中发现生成的项目中存在嵌套的 `#app` div 元素
   - 问题原因：Vue 3 在挂载应用时会自动创建一个包装 div，而模板中又包含了一个 `#app` div

3. **模板修复**：
   - 移除了 App.vue 模板中的 `id="app"` 属性
   - 更新了 CSS 样式选择器，从 `#app` 改为 `div`
   - 确保生成的项目结构正确，不会出现重复的 DOM 元素

4. **模板功能增强**：
   - 在 create.js 中实现了模板复制和 EJS 渲染功能
   - 支持在 index.html 和 App.vue 中使用 `<%= appName %>` 变量
   - 完善了模板复制逻辑，能够递归处理目录结构

## 依赖管理

使用 pnpm workspace 和 Lerna 进行依赖管理：

1. 共享依赖安装在根目录 node_modules
2. 包间依赖通过 workspace 协议链接
3. 版本管理使用 Lerna 的 independent 模式

## 构建和发布流程

1. 使用 Lerna 进行版本管理和发布
2. 通过 pnpm workspace 管理包间依赖
3. 发布时自动处理依赖关系

## 文件注释说明

为了提高代码可读性和可维护性，项目中关键文件都添加了详细的注释：

### shared-configs 包
- `index.js`：导出所有配置模块
- `eslint/index.js`：ESLint 配置，支持 Vue 3 和 TypeScript
- `prettier/index.js`：Prettier 配置，统一代码格式化规则
- `stylelint/index.js`：Stylelint 配置，支持 CSS/SCSS 规范检查
- `commitlint/index.js`：Commitlint 配置，Git 提交信息规范检查

### cli 包
- `bin/tywd.js`：CLI 主入口，注册所有子命令
- `bin/create.js`：create 命令入口
- `lib/create.js`：create 命令核心实现，包含交互式项目创建逻辑
- `bin/init.js`：init 命令入口
- `lib/init.js`：init 命令核心实现，包含规范配置初始化逻辑
- `bin/fix.js`：fix 命令入口
- `lib/fix.js`：fix 命令核心实现，包含代码问题扫描和修复逻辑