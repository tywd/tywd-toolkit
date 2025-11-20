const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');
const { execSync } = require('child_process');
const ejs = require('ejs');

const TEMPLATE_DIR = path.join(__dirname, '../templates');

// 检查是否在 tywd-toolkit 工作区内
function isInTywdWorkspace(projectPath) {
  let currentDir = projectPath;
  while (currentDir !== path.parse(currentDir).root) {
    const pnpmWorkspacePath = path.join(currentDir, 'pnpm-workspace.yaml');
    if (fs.existsSync(pnpmWorkspacePath)) {
      const workspaceContent = fs.readFileSync(pnpmWorkspacePath, 'utf8');
      if (workspaceContent.includes('packages/*')) {
        return true;
      }
    }
    currentDir = path.dirname(currentDir);
  }
  return false;
}

async function createProject() {
  console.log(chalk.green('Welcome to TYWD CLI!'));
  
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Project name:',
      default: 'my-project',
    },
    {
      type: 'input',
      name: 'projectDescription',
      message: 'Project description:',
      default: 'A new project created with TYWD CLI',
    },
    {
      type: 'list',
      name: 'template',
      message: 'Select a template:',
      choices: [
        { name: 'Qiankun + Vite + Vue 3 (TypeScript)', value: 'qiankun-vite-sub' },
        { name: 'Qiankun + Webpack + Vue 3 (TypeScript)', value: 'qiankun-webpack-sub' },
        { name: 'Vite + Vue 3 (JavaScript)', value: 'vite-vue3-js' },
        { name: 'Vite + Vue 3 (TypeScript)', value: 'vite-vue3-ts' },
      ],
      default: 'qiankun-vite-sub',
    },
    {
      type: 'confirm',
      name: 'installDeps',
      message: 'Install dependencies?',
      default: true,
    },
  ]);

  const { projectName, template, installDeps } = answers;
  const projectPath = path.join(process.cwd(), projectName);

  // Check if directory already exists
  if (fs.existsSync(projectPath)) {
    console.error(chalk.red(`Directory ${projectName} already exists!`));
    process.exit(1);
  }

  // Create project directory
  fs.ensureDirSync(projectPath);
  process.chdir(projectPath);

  const spinner = ora('Creating project...').start();

  try {
    // Copy template files
    const templatePath = path.join(TEMPLATE_DIR, template);
    if (fs.existsSync(templatePath)) {
      // 如果模板存在，则复制模板文件并渲染EJS变量
      await copyAndRenderTemplate(templatePath, projectPath, { projectName, projectDescription });
    } else {
      // 如果模板不存在，则创建基本结构
      await createBasicTemplate(projectPath, template);
    }

    // Update package.json based on workspace context
    const pkgPath = path.join(projectPath, 'package.json');
    if (fs.existsSync(pkgPath)) {
      const pkg = fs.readJsonSync(pkgPath);
      pkg.name = projectName;
      
      // 检查是否在 tywd-toolkit 工作区内
      const inWorkspace = isInTywdWorkspace(projectPath);
      
      // 如果不在工作区内，移除对 shared-configs 的引用
      if (!inWorkspace) {
        if (pkg.devDependencies && pkg.devDependencies['@tywd/shared-configs']) {
          delete pkg.devDependencies['@tywd/shared-configs'];
        }
      }
      
      fs.writeJsonSync(pkgPath, pkg, { spaces: 2 });
    }

    spinner.succeed('Project created successfully!');

    // Install dependencies
    if (installDeps) {
      const installSpinner = ora('Installing dependencies...').start();
      try {
        // 检查是否在 tywd-toolkit 工作区内
        if (isInTywdWorkspace(projectPath)) {
          // 在工作区内使用 pnpm install
          execSync('pnpm install', { stdio: 'ignore' });
        } else {
          // 在工作区外使用 pnpm install 并添加 --no-frozen-lockfile 参数
          execSync('pnpm install --no-frozen-lockfile', { stdio: 'ignore' });
        }
        installSpinner.succeed('Dependencies installed successfully!');
      } catch (error) {
        installSpinner.fail('Failed to install dependencies');
        console.error(chalk.red(error.message));
        console.log(chalk.yellow('You can manually install dependencies by running: pnpm install'));
      }
    }

    console.log(chalk.green('\nProject setup complete!'));
    console.log(chalk.blue(`\nTo get started:\n`));
    console.log(chalk.gray(`  cd ${projectName}`));
    console.log(chalk.gray(`  pnpm dev`));
  } catch (error) {
    spinner.fail('Failed to create project');
    console.error(chalk.red(error.message));
    process.exit(1);
  }
}

// 复制并渲染模板文件
async function copyAndRenderTemplate(templatePath, projectPath, data) {
  const files = fs.readdirSync(templatePath);
  
  for (const file of files) {
    const srcPath = path.join(templatePath, file);
    const destPath = path.join(projectPath, file);
    const stat = fs.statSync(srcPath);
    
    if (stat.isDirectory()) {
      // 如果是目录，递归复制
      fs.ensureDirSync(destPath);
      await copyAndRenderTemplate(srcPath, destPath, data);
    } else {
      // 如果是文件，检查是否需要渲染EJS
      if (path.extname(file) === '.html' || path.extname(file) === '.vue') {
        // 渲染EJS模板
        const content = fs.readFileSync(srcPath, 'utf-8');
        const rendered = ejs.render(content, data);
        fs.writeFileSync(destPath, rendered);
      } else {
        // 直接复制文件
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}

// Create basic project structure and files
async function createBasicTemplate(projectPath, template) {
  // Create basic package.json
  const pkg = {
    name: path.basename(projectPath),
    version: '1.0.0',
    scripts: {
      dev: 'vite',
      build: 'vite build',
      serve: 'vite preview'
    },
    dependencies: {},
    devDependencies: {}
  };

  // Add template-specific dependencies
  if (template.includes('vue3')) {
    pkg.dependencies['vue'] = '^3.2.0';
    pkg.devDependencies['@vitejs/plugin-vue'] = '^3.0.0';
  }

  if (template.includes('ts')) {
    pkg.devDependencies['typescript'] = '^4.6.0';
    pkg.devDependencies['vue-tsc'] = '^0.38.0';
  }

  pkg.devDependencies['vite'] = '^3.0.0';

  fs.writeJsonSync(path.join(projectPath, 'package.json'), pkg, { spaces: 2 });

  // Create basic directory structure
  fs.ensureDirSync(path.join(projectPath, 'src'));
  fs.ensureDirSync(path.join(projectPath, 'public'));

  // Create index.html
  const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${pkg.name}</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>`;
  fs.writeFileSync(path.join(projectPath, 'index.html'), indexHtml);

  // Create basic main.js or main.ts
  const isTs = template.includes('ts');
  const mainFile = isTs ? 'src/main.ts' : 'src/main.js';
  const mainContent = `import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
`;
  fs.writeFileSync(path.join(projectPath, mainFile), mainContent);

  // Create App.vue
  const appVueContent = `<template>
  <div id="app">
    <h1>Hello, ${pkg.name}!</h1>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
`;
  fs.writeFileSync(path.join(projectPath, 'src/App.vue'), appVueContent);

  // Create vite.config.js or vite.config.ts
  const configFile = isTs ? 'vite.config.ts' : 'vite.config.js';
  const configContent = isTs ? 
`import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()]
})
` :
`import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()]
})
`;
  fs.writeFileSync(path.join(projectPath, configFile), configContent);
}

module.exports = { createProject };