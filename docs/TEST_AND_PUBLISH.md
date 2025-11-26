# TYWD Toolkit 测试和发布文档

## 本地测试

### 环境准备

1. 确保已安装 Node.js (>=20.0.0) 和 pnpm (>=8.0.0)
2. 克隆项目到本地：
   ```bash
   git clone <repository-url>
   cd tywd-toolkit
   ```

### 安装依赖

在项目根目录下执行：

```bash
# 安装所有依赖
pnpm install

# Bootstrap 所有包
pnpm run bootstrap
```

### 测试 CLI 工具

#### 1. 链接 CLI 工具进行测试

```bash
# 在项目根目录下链接 CLI 工具
pnpm link --global

# 测试 CLI 命令
tywd --help
tywd create --help
tywd init --help
tywd fix --help
```

#### 2. 测试 create 命令

```bash
# 创建测试项目
tywd create test-project

# 进入项目目录
cd test-project

# 检查生成的文件结构
ls -la

# 测试项目是否能正常运行
npm run dev
```

#### 3. 测试 init 命令

```bash
# 创建一个空的测试目录
mkdir test-init
cd test-init

# 初始化 npm 项目
npm init -y

# 初始化规范配置
tywd init

# 检查生成的配置文件
ls -la

# 检查 package.json 中是否添加了 prepare 脚本
cat package.json
```

#### 4. 测试 fix 命令

```bash
# 在一个有代码问题的项目中测试
cd test-project

# 运行 fix 命令
tywd fix
```

### 单元测试

目前项目中还没有添加单元测试，后续将会添加：

1. 为 shared-configs 包添加配置验证测试
2. 为 CLI 命令添加功能测试
3. 使用 Jest/Mocha/Vitest 作为测试框架

## 发布到 npm

### 发布前准备

1. 确保已登录 npm 账号：
   ```bash
   npm login
   ```

2. 检查版本号：
   确保要发布的包版本号是正确的，遵循语义化版本控制规范。

3. 确保代码已提交：
   发布前确保所有代码变更已提交到版本控制系统。

### 发布流程

#### 1. 构建项目

```bash
# 在项目根目录下执行构建
pnpm run build
```

#### 2. 使用 Lerna 发布

```bash
# 发布所有包
lerna publish

# 或者选择要发布的包
lerna publish --scope=@tywd/shared-utils
lerna publish --scope=@tywd/shared-configs
lerna publish --scope=@tywd/cli

> 注意：请确保使用 Lerna 8.x 版本，旧版本可能存在兼容性问题。
```

Lerna 会：
1. 提示选择版本号更新方式（major、minor、patch 或自定义）
2. 更新包的版本号
3. 生成 changelog
4. 提交 git 变更
5. 为新版本创建 git tag
6. 发布到 npm

#### 3. 手动发布（可选）

如果需要手动发布单个包：

```bash
# 进入包目录
cd packages/shared-configs

# 发布
npm publish

# 或进入 CLI 包目录
cd packages/cli
npm publish
```

### 发布后验证

1. 检查 npm 官网确认包已成功发布
2. 在新目录中测试安装：
   ```bash
   # 创建测试目录
   mkdir test-install
   cd test-install
   
   # 安装 CLI 工具
   npm install @tywd/cli
   
   # 测试命令
   npx tywd --help
   ```

## 故障排除

### 常见问题

1. **权限问题**：
   如果在链接或发布时遇到权限问题，尝试使用 `sudo` 或检查 npm 的默认目录权限。

2. **依赖安装失败**：
   清除 pnpm 缓存后重试：
   ```bash
   pnpm store prune
   pnpm install
   ```

3. **Lerna 发布失败**：
   检查网络连接和 npm 账号状态，确认当前版本号未被占用。

4. **Git hooks 问题**：
   确保 Husky 已正确安装和配置，可以手动执行 `husky install`。

### 日志和调试

1. 使用 `--verbose` 参数获取更多日志信息：
   ```bash
   lerna publish --verbose
   ```

2. 检查 npm-debug.log 文件以获取详细错误信息。

## 最佳实践

1. **版本管理**：
   - 遵循语义化版本控制规范
   - 在发布前更新 CHANGELOG.md

2. **测试**：
   - 发布前在干净环境中测试安装和使用
   - 确保所有功能正常工作

3. **文档**：
   - 及时更新 README.md 和相关文档
   - 提供清晰的使用示例

4. **安全性**：
   - 定期检查依赖安全性
   - 不要在配置文件中包含敏感信息