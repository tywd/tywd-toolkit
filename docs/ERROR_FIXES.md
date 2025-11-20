# TYWD Toolkit 错误修复记录

## 1. 构建失败问题修复

### 问题描述
在准备发布 TYWD Toolkit 时，运行 `pnpm run build` 命令失败，出现以下错误：
```
src/dateUtils.ts(12,44): error TS2550: Property 'padStart' does not exist on type 'string'. Do you need to change your target library? Try changing the 'lib' compiler option to 'es2017' or later.
```

### 问题分析
1. **TypeScript 编译错误**：错误信息明确指出 `padStart` 属性不存在，建议将编译目标库更改为 `es2017` 或更高版本。
2. **Lerna 构建脚本缺失**：运行 `pnpm run build` 时，Lerna 尝试在所有包中运行 build 脚本，但部分包没有定义 build 脚本。

### 修复过程

#### 1.1 TypeScript 编译目标更新
**问题定位**：
- 在 `packages/shared-utils/tsconfig.json` 文件中，`target` 被设置为 `ES2015`
- `padStart` 方法是在 ES2017 中引入的，因此在 ES2015 目标下不可用

**修复措施**：
```json
{
  "compilerOptions": {
    "target": "ES2017",  // 从 ES2015 更新为 ES2017
    // ... 其他配置
  }
}
```

#### 1.2 Lerna 构建脚本补充
**问题定位**：
- 根目录 package.json 定义了 `"build": "lerna run build"` 脚本
- 但 `shared-configs` 和 `cli` 包没有定义 build 脚本
- Lerna 在运行 build 脚本时会尝试在所有包中执行，缺少脚本的包会报错

**修复措施**：
为 `packages/shared-configs/package.json` 添加 build 脚本：
```json
{
  "scripts": {
    "build": "echo \"No build step required\"",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

为 `packages/cli/package.json` 添加 build 脚本：
```json
{
  "scripts": {
    "build": "echo \"No build step required\"",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

### 验证结果
修复后，运行 `pnpm run build` 命令成功执行：
```
> tywd-toolkit@1.0.0 build /Users/shichuyu/Desktop/web/qoder/tywd-toolkit
> lerna run build

lerna notice cli v6.6.2
lerna info versioning independent

    ✔  @tywd/shared-configs:build (3s)
    ✔  @tywd/shared-utils:build (5s)
    ✔  @tywd/cli:build (3s)

 ———————————————————————————————————————————————————————————————————————

 >  Lerna (powered by Nx)   Successfully ran target build for 3 projects 
(6s)
```

### 经验总结
1. **TypeScript 目标版本匹配**：使用较新的 JavaScript 特性时，需要确保 TypeScript 编译目标版本支持这些特性。
2. **Monorepo 构建一致性**：在 Lerna 管理的 Monorepo 项目中，所有包应该具有一致的脚本定义，即使某些包不需要特定的构建步骤。
3. **错误信息的价值**：TypeScript 编译器提供的错误信息非常有价值，通常会直接指出解决方案。

## 2. 发布过程中依赖解析失败问题修复

### 问题描述
在尝试发布 TYWD Toolkit 时，Lerna 在更新包版本过程中失败，出现以下错误：
```
ERR_PNPM_FETCH_404 GET https://registry.npmjs.org/@tywd%2Fshared-configs: Not Found - 404

@tywd/shared-configs is not in the npm registry, or you have no permission to fetch it.
```

### 问题分析
1. **依赖解析问题**：Lerna 在更新版本时会尝试更新包之间的依赖关系
2. **未发布包依赖**：由于 `@tywd/shared-configs` 包还没有发布到 npm，所以 pnpm 无法解析这个依赖
3. **版本循环依赖**：cli 包依赖 shared-configs 包，但在发布过程中版本号被更新，而新版本尚未发布

### 修复过程
这个问题通常在首次发布或同时发布多个相互依赖的包时出现。解决方案包括：

1. **使用 workspace 协议**：在开发过程中，包之间的依赖应该使用 `workspace:*` 协议而不是具体版本号

2. **分阶段发布**：如果包之间有依赖关系，可以考虑先发布被依赖的包

3. **忽略依赖解析**：在发布时使用 `--no-push` 和 `--no-git-tag-version` 选项，手动处理 git 操作

### 验证结果
这个问题需要在实际发布过程中验证解决方案的有效性。

### 经验总结
1. **首次发布注意事项**：在首次发布相互依赖的包时，需要特别注意依赖解析问题
2. **workspace 协议的重要性**：在 Monorepo 项目中，本地包之间的依赖应该使用 workspace 协议
3. **发布策略**：对于有依赖关系的包，可能需要采用分阶段发布策略