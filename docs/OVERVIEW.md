# TYWD Toolkit 完整说明文档

## 项目概述

TYWD Toolkit 是一个前端开发工具包，集成了项目脚手架和代码规范功能，基于 Lerna + pnpm 管理的 Monorepo 架构。该工具包旨在提高前端开发效率，统一团队代码规范，简化项目初始化流程。

## 核心功能

### 1. 项目脚手架 (Project Scaffolding)
通过交互式命令行界面快速创建项目模板：
- 支持多种技术栈模板选择
- 自动创建项目目录结构
- 生成基础配置文件
- 可选自动安装依赖

### 2. 代码规范 (Code Standards)
集成主流代码规范工具，确保代码质量一致性：
- **ESLint**：JavaScript/TypeScript 代码检查
- **Prettier**：代码格式化
- **Stylelint**：CSS/SCSS 样式规范检查
- **Commitlint**：Git 提交信息规范检查

### 3. 一键接入 (One-click Integration)
为现有项目快速集成代码规范配置：
- 自动生成所需的 Lint 配置文件
- 配置 Husky Git hooks
- 设置 lint-staged 配置

### 4. 代码修复 (Code Fixing)
自动扫描和修复代码规范问题：
- 执行 ESLint 自动修复
- 执行 Prettier 格式化
- 执行 Stylelint 自动修复

### 5. 提交规范 (Commit Standards)
集成 Commitlint + Husky 实现提交信息格式校验：
- 检查提交信息格式
- 提交前自动修复代码问题
- 确保代码质量符合规范

## 目录结构

```
tywd-toolkit/
├─ docs/                  # 文档目录
│  ├─ IMPLEMENTATION.md   # 实现文档
│  ├─ TEST_AND_PUBLISH.md # 测试和发布文档
│  └─ OVERVIEW.md         # 完整说明文档（本文档）
├─ packages/
│  ├─ shared-configs/     # 统一配置包
│  ├─ shared-utils/       # 基础工具包
│  └─ cli/                # 命令行工具包
├─ lerna.json             # Lerna 配置
├─ pnpm-workspace.yaml    # pnpm Workspace 配置
└─ package.json           # 项目配置
```

## 包结构详解

### @tywd/shared-configs
统一配置包，包含以下配置：
- **ESLint 配置**：基于 Vue 3 和 TypeScript 的推荐规则，支持传统格式和扁平格式（ESLint 9.0.0+）
- **Prettier 配置**：统一的代码格式化规则
- **Stylelint 配置**：CSS/SCSS 样式规范检查
- **Commitlint 配置**：Git 提交信息规范检查

### @tywd/shared-utils
基础工具包，提供常用的工具函数：
- 日期处理工具
- 后续将扩展更多实用工具函数

### @tywd/cli
命令行工具包，提供以下命令：
- `create`：交互式创建新项目
- `init`：在现有项目中初始化代码规范配置
- `fix`：扫描并自动修复代码规范问题

## 项目模板

### 当前支持的模板
1. **qiankun-vite-sub**：基于 Vite 和 Vue 3 的微前端子应用模板
2. **qiankun-webpack-sub**：基于 Webpack 和 Vue 3 的微前端子应用模板
3. **vite-vue3-js**：Vite + Vue 3 JavaScript 模板
4. **vite-vue3-ts**：Vite + Vue 3 TypeScript 模板

### 模板特性
- 集成完整的代码规范工具（ESLint、Prettier、Stylelint、Commitlint、Husky、lint-staged）
- 预配置 Git hooks
- 包含 .npmrc 配置文件
- 支持工作区内和工作区外使用

## 技术栈

- [Lerna](https://lerna.js.org/)：Monorepo 管理工具
- [pnpm](https://pnpm.io/)：快速、节省磁盘空间的包管理器
- [ESLint](https://eslint.org/)：JavaScript/TypeScript 代码检查工具
- [Prettier](https://prettier.io/)：代码格式化工具
- [Stylelint](https://stylelint.io/)：CSS/SCSS 代码检查工具
- [Commitlint](https://commitlint.js.org/)：Git 提交信息检查工具
- [Husky](https://typicode.github.io/husky/)：Git hooks 工具
- [lint-staged](https://github.com/okonet/lint-staged)：对暂存文件执行 lint 工具
- [Commander.js](https://github.com/tj/commander.js/)：命令行界面构建工具
- [Inquirer](https://github.com/SBoudrias/Inquirer.js/)：交互式命令行工具
- [ejs](https://ejs.co/)：模板引擎

## 使用方法

### 安装
```bash
# 全局安装
npm install -g @tywd/cli

# 或者使用 npx（推荐）
npx @tywd/cli create my-project
```

### 创建项目
```bash
# 创建新项目
tywd create my-project

# 或使用 npx
npx @tywd/cli create my-project
```

### 初始化规范配置
```bash
# 进入项目目录
cd my-project

# 初始化规范配置
tywd init

# 或使用 npx
npx @tywd/cli init
```

### 修复代码问题
```bash
# 进入项目目录
cd my-project

# 扫描并修复代码问题
tywd fix

# 或使用 npx
npx @tywd/cli fix
```

## 未来拓展计划

### 1. 模板扩展
计划增加更多项目模板以支持不同的技术栈和场景：

#### 前端框架模板
- **React 模板**：
  - Vite + React (JavaScript/TypeScript)
  - Webpack + React (JavaScript/TypeScript)
  - CRA (Create React App) 模板

- **Angular 模板**：
  - Angular CLI 模板
  - Nx 工作区模板

- **Svelte 模板**：
  - SvelteKit 模板
  - Vite + Svelte 模板

#### 微前端模板
- **主应用模板**：
  - qiankun 主应用模板（Vite 和 Webpack 版本）
  - single-spa 主应用模板

- **子应用模板**：
  - 更多微前端框架支持（如 EMP、Micro Frontend 等）

#### 移动端模板
- **React Native 模板**
- **Flutter 模板**
- **uni-app 模板**

#### Node.js 服务端模板
- **Express 模板**
- **Koa 模板**
- **NestJS 模板**
- **Fastify 模板**

#### 静态站点模板
- **Gatsby 模板**
- **Next.js 模板**
- **Nuxt.js 模板**

### 2. 功能增强

#### CLI 工具功能扩展
- **scan 命令**：扫描项目中的潜在问题和优化点
- **migrate 命令**：帮助项目迁移到新的规范或框架版本
- **analyze 命令**：分析项目结构和依赖关系
- **update 命令**：更新项目依赖和配置到最新版本

#### 配置包增强
- **更多 ESLint 插件支持**：
  - React 相关规则
  - Angular 相关规则
  - 安全性检查规则
  - 性能优化规则

- **Prettier 配置扩展**：
  - 支持更多文件类型格式化
  - 提供多种风格配置选项

- **Stylelint 配置扩展**：
  - 支持 CSS-in-JS
  - 支持 Styled Components
  - 支持更多 CSS 框架（如 Tailwind CSS、Bootstrap 等）

- **Commitlint 配置扩展**：
  - 支持自定义提交类型
  - 支持团队特定的提交规范

#### 模板功能增强
- **国际化支持**：集成 i18n 解决方案
- **主题定制**：支持动态主题切换
- **响应式设计**：集成响应式设计最佳实践
- **性能优化**：预配置性能优化方案
- **SEO 优化**：集成 SEO 最佳实践

### 3. 测试体系完善

#### 单元测试
- 为 shared-configs 包添加配置验证测试
- 为 CLI 命令添加功能测试
- 为 shared-utils 包添加工具函数测试
- 使用 Jest/Vitest 作为测试框架

#### 集成测试
- CLI 工具端到端测试
- 模板生成和构建测试
- 配置文件兼容性测试

#### 测试工具集成
- 集成测试覆盖率报告
- 集成持续集成（CI）流程
- 自动化测试部署

### 4. 文档体系完善

#### 用户文档
- 详细的使用指南
- 常见问题解答（FAQ）
- 故障排除指南
- 最佳实践文档

#### 开发者文档
- 贡献指南
- 架构设计文档
- API 参考文档
- 扩展开发指南

#### 模板文档
- 每个模板的详细使用说明
- 模板定制指南
- 模板更新日志

### 5. DevOps 和部署优化

#### CI/CD 集成
- GitHub Actions 工作流模板
- GitLab CI 配置模板
- Jenkins 配置模板

#### 部署支持
- Docker 配置模板
- Kubernetes 部署配置
- 云服务部署脚本（AWS、Azure、GCP）

#### 监控和日志
- 集成监控解决方案
- 日志收集和分析配置
- 性能监控配置

### 6. 社区和生态建设

#### 插件系统
- 支持第三方插件扩展
- 插件开发工具包
- 插件市场集成

#### 社区支持
- 建立社区论坛
- 提供技术支持渠道
- 定期发布更新和改进

通过以上拓展计划，TYWD Toolkit 将成为一个更加完善和强大的前端开发工具包，能够满足不同项目和团队的需求，提高开发效率和代码质量。