# TYWD Toolkit

TYWD Toolkit 是一个前端开发工具包，集成了项目脚手架和代码规范功能，基于 Lerna + pnpm 管理的 Monorepo 架构。\
> PS：属于自用项目，暂时可能还未成熟，等成熟后会删除此段说明

## 功能特性

- 🚀 项目脚手架：交互式初始化项目模板
- 📏 代码规范：集成 ESLint、Prettier、Stylelint 等主流规范工具
- 🔧 一键接入：自动生成所需的 Lint 配置文件
- 🛠 代码修复：一键扫描存量代码问题并自动修复
- 📝 提交规范：集成 Commitlint + husky 实现提交信息格式校验

## 目录结构

```
tywd-toolkit/
├─ docs/                   # 文档目录
│  ├─ IMPLEMENTATION.md     # 实现文档
│  ├─ TEST_AND_PUBLISH.md   # 测试和发布文档
│  ├─ OVERVIEW.md           # 完整说明文档
│  └─ ERROR_FIXES.md        # 错误修复记录
├─ packages/
│  ├─ shared-configs/       # 统一配置包（集合eslint，prettier，stylinit，commitlint可结合husky使用，对内对外均可使用）
│  ├─ shared-utils/         # 基础工具包
│  └─ cli/                  # 应用脚手架（可初始化vue3应用，后续支持扩展新的应用模板选择）
├─ lerna.json               # Lerna 配置
├─ pnpm-workspace.yaml      # pnpm Workspace 配置
└─ package.json             # 项目配置
```

## 安装

```bash
# 全局安装
npm install -g @tywd/cli

# 或者使用 npx（推荐）
npx @tywd/cli create my-project
```

## 使用方法

### 创建项目

```bash
# 创建新项目
tywd create my-project

# 或使用 npx
npx @tywd/cli create my-project
```

### 初始化规范配置

在现有项目中初始化代码规范配置：

```bash
# 进入项目目录
cd my-project

# 初始化规范配置
tywd init

# 或使用 npx
npx @tywd/cli init
```

### 修复代码问题

扫描并自动修复代码中的规范问题：

```bash
# 进入项目目录
cd my-project

# 扫描并修复代码问题
tywd fix

# 或使用 npx
npx @tywd/cli fix
```

## 本地开发

### 安装依赖

```bash
# 在项目根目录下安装所有依赖
pnpm install

# Bootstrap 所有包
pnpm run bootstrap
```

### 测试 CLI 工具

```bash
# 在项目根目录下链接 CLI 工具
pnpm link --global

# 现在可以在任何地方使用 tywd 命令
tywd --help
```

## 发布到 npm

1. 登录 npm 账号：
   ```bash
   npm login
   ```

2. 发布包：
   ```bash
   # 发布所有包
   pnpm run build
   lerna publish
   
   # 或者单独发布某个包
   lerna publish --scope=@tywd/shared-utils
   lerna publish --scope=@tywd/shared-configs
   lerna publish --scope=@tywd/cli
   ```
   
> 注意：请确保使用 Lerna 8.x 版本，旧版本可能存在兼容性问题。

## 配置说明

### shared-configs 包

该包包含以下配置：

- **ESLint 配置**：基于 Vue 3 和 TypeScript 的推荐规则
- **Prettier 配置**：统一的代码格式化规则
- **Stylelint 配置**：CSS/SCSS 样式规范检查
- **Commitlint 配置**：Git 提交信息规范检查

### CLI 包

CLI 工具提供以下命令：

- `create`：创建新项目
- `init`：初始化规范配置
- `fix`：修复代码问题

## 技术栈

- [Lerna](https://lerna.js.org/)：Monorepo 管理工具
- [pnpm](https://pnpm.io/)：快速、节省磁盘空间的包管理器
- [ESLint](https://eslint.org/)：JavaScript/TypeScript 代码检查工具
- [Prettier](https://prettier.io/)：代码格式化工具
- [Stylelint](https://stylelint.io/)：CSS/SCSS 代码检查工具
- [Commitlint](https://commitlint.js.org/)：Git 提交信息检查工具
- [husky](https://typicode.github.io/husky/)：Git hooks 工具
- [Inquirer](https://github.com/SBoudrias/Inquirer.js/)：交互式命令行工具
- [ejs](https://ejs.co/)：模板引擎

## 许可证

MIT