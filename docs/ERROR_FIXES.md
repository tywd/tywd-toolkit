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
> tywd-toolkit@1.0.0 build /tywd-toolkit
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

## 3. Lerna 与 pnpm 工作区兼容性问题修复

### 问题描述
在运行 `pnpm run build` 命令时，出现以下错误：
```
lerna ERR! ENOWORKSPACES Usage of pnpm without workspaces is not supported. To use pnpm with lerna, set useWorkspaces to true in lerna.json and configure pnpm to use workspaces: https://pnpm.io/workspaces.
```

### 问题分析
1. **配置不一致**：Lerna 和 pnpm 工作区配置不匹配
2. **版本差异**：不同版本的 Lerna 对 pnpm 工作区的支持方式可能不同
3. **文档矛盾**：Lerna 文档中提到已移除 `useWorkspaces` 选项，但在实际使用中仍需要

### 修复过程
1. **恢复 useWorkspaces 配置**：在 `lerna.json` 中重新添加 `"useWorkspaces": true` 配置项
2. **验证配置**：确保 `pnpm-workspace.yaml` 文件正确配置
3. **测试构建**：运行 `pnpm run build` 验证问题是否解决

### 验证结果
修复后，运行 `pnpm run build` 命令成功执行，所有包的构建产物都已正确生成：
```
> tywd-toolkit@1.0.0 build /tywd-toolkit
> lerna run build

lerna notice cli v6.6.2
lerna info versioning independent

    ✔  @tywd/shared-configs:build (3s)
    ✔  @tywd/shared-utils:build (4s)
    ✔  @tywd/cli:build (2s)

 ———————————————————————————————————————————————————————————————————————

 >  Lerna (powered by Nx)   Successfully ran target build for 3 projects 
(5s)
```

### 经验总结
1. **配置一致性**：在使用 Lerna 和 pnpm 工作区时，确保配置一致性非常重要
2. **实践验证**：实际运行结果比文档描述更可靠，遇到问题时应以实际测试为准
3. **版本兼容性**：不同版本的工具可能存在兼容性差异，需要根据实际情况调整配置

## 4. Lerna 8.x 版本兼容性问题修复

### 问题描述
在运行 `lerna publish` 命令时，出现以下错误：
```
lerna ERR! ECONFIGWORKSPACES The "useWorkspaces" option has been removed. By default lerna will resolve your packages using your package manager's workspaces configuration. Alternatively, you can manually provide a list of package globs to be used instead via the "packages" option in lerna.json.
```

### 问题分析
1. **版本差异**：Lerna 8.x 版本确实移除了 `useWorkspaces` 选项
2. **配置冲突**：我们之前为了兼容 Lerna 6.x 版本添加了 `useWorkspaces` 选项，但现在使用的是 Lerna 8.x 版本
3. **文档更新滞后**：不同版本的文档可能存在差异

### 修复过程
1. **移除 useWorkspaces 配置**：在 `lerna.json` 中移除 `"useWorkspaces": true` 配置项
2. **保留基础配置**：确保 `packages` 和 `npmClient` 配置项正确
3. **测试发布**：验证 `lerna publish` 命令是否正常工作

### 验证结果
修复后，`lerna publish` 命令应该能够正常运行，不再出现配置冲突错误。

### 经验总结
1. **版本一致性**：确保工具版本与配置保持一致
2. **渐进式升级**：在升级工具版本时，需要同时更新相关配置
3. **文档验证**：不同版本的文档可能存在差异，需要根据实际使用的版本查阅对应文档