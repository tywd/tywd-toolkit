# @tywd/shared-configs

TYWD 工具包的共享配置集合，包含 ESLint、Prettier、Stylelint 和 Commitlint 的标准化配置。

## 功能特性

- 📝 统一的代码规范配置
- 🎨 一致的代码风格
- 📦 开箱即用的配置集合
- 🔧 易于扩展和自定义

## 包含的配置

### ESLint 配置

提供 Vue 3 项目的 ESLint 配置，包含 TypeScript 支持。

```javascript
// .eslintrc.js
module.exports = {
  extends: ['@tywd/shared-configs/eslint']
}
```

### Prettier 配置

统一的代码格式化配置。

```javascript
// .prettierrc.js
module.exports = require('@tywd/shared-configs/prettier')
```

### Stylelint 配置

CSS/SCSS 样式规范配置。

```javascript
// .stylelintrc.js
module.exports = {
  extends: ['@tywd/shared-configs/stylelint']
}
```

### Commitlint 配置

Git 提交信息规范配置。

```javascript
// commitlint.config.js
module.exports = {
  extends: ['@tywd/shared-configs/commitlint']
}
```

## 安装

```bash
npm install -D @tywd/shared-configs
```

## 使用方法

### 单独使用某个配置

```javascript
// .eslintrc.js
module.exports = {
  extends: ['@tywd/shared-configs/eslint']
}
```

```javascript
// .prettierrc.js
module.exports = require('@tywd/shared-configs/prettier')
```

```javascript
// .stylelintrc.js
module.exports = {
  extends: ['@tywd/shared-configs/stylelint']
}
```

```javascript
// commitlint.config.js
module.exports = {
  extends: ['@tywd/shared-configs/commitlint']
}
```

### 一次性使用所有配置

```javascript
// 引入所有配置
const configs = require('@tywd/shared-configs')

// 在项目中使用
module.exports = {
  eslint: configs.eslint,
  prettier: configs.prettier,
  stylelint: configs.stylelint,
  commitlint: configs.commitlint
}
```

## 配置详情

### ESLint 配置

- 基于 [@typescript-eslint/recommended](https://github.com/typescript-eslint/typescript-eslint)
- Vue 3 支持
- Prettier 集成
- 导入排序规则

### Prettier 配置

- 单引号
- 尾随逗号
- 缩进宽度为 2
- 行宽为 100

### Stylelint 配置

- 标准 CSS 规范
- SCSS 支持
- 属性排序
- 颜色十六进制格式化

### Commitlint 配置

- 基于 [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint)
- 支持 conventional commits 格式
- 自定义规则

## 自定义配置

如果需要扩展或覆盖默认配置，可以在项目中创建自定义配置文件：

```javascript
// .eslintrc.js
module.exports = {
  extends: ['@tywd/shared-configs/eslint'],
  rules: {
    // 自定义规则
    'no-console': 'warn'
  }
}
```

## 依赖说明

此包依赖以下 peer dependencies：

- `eslint`: ^8.0.0
- `prettier`: ^2.0.0
- `stylelint`: ^14.0.0
- `commitlint`: ^17.0.0

请确保在项目中安装这些依赖。

## 许可证

MIT