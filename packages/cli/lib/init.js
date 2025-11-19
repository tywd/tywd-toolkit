// 代码规范初始化核心逻辑实现
// 该文件负责在现有项目中初始化各种代码规范配置

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');

// 初始化代码规范配置主函数
// 该函数会在当前项目中生成各种 lint 配置文件
async function initLinting() {
  console.log(chalk.green('Initializing linting configurations...'));
  
  const projectRoot = process.cwd();
  
  // Check if we're in a project with package.json
  const pkgPath = path.join(projectRoot, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    console.error(chalk.red('No package.json found. Please run this command in a project directory.'));
    process.exit(1);
  }
  
  const spinner = ora('Setting up configurations...').start();
  
  try {
    // Setup ESLint configuration
    await setupEslintConfig(projectRoot);
    
    // Setup Prettier configuration
    await setupPrettierConfig(projectRoot);
    
    // Setup Stylelint configuration
    await setupStylelintConfig(projectRoot);
    
    // Setup Commitlint configuration
    await setupCommitlintConfig(projectRoot);
    
    // Setup Husky hooks
    await setupHusky(projectRoot);
    
    spinner.succeed('Linting configurations initialized successfully!');
    
    console.log(chalk.blue('\nNext steps:'));
    console.log(chalk.gray('1. Review the generated configuration files'));
    console.log(chalk.gray('2. Add linting scripts to your package.json'));
    console.log(chalk.gray('3. Install dependencies if not already installed'));
  } catch (error) {
    spinner.fail('Failed to initialize configurations');
    console.error(chalk.red(error.message));
    process.exit(1);
  }
}

async function setupEslintConfig(projectRoot) {
  const eslintConfig = {
    extends: ['@tywd/shared-configs/eslint']
  };
  
  fs.writeJsonSync(path.join(projectRoot, '.eslintrc'), eslintConfig, { spaces: 2 });
}

async function setupPrettierConfig(projectRoot) {
  const prettierConfig = require('@tywd/shared-configs/prettier');
  fs.writeJsonSync(path.join(projectRoot, '.prettierrc'), prettierConfig, { spaces: 2 });
}

async function setupStylelintConfig(projectRoot) {
  const stylelintConfig = {
    extends: ['@tywd/shared-configs/stylelint']
  };
  
  fs.writeJsonSync(path.join(projectRoot, '.stylelintrc'), stylelintConfig, { spaces: 2 });
}

async function setupCommitlintConfig(projectRoot) {
  const commitlintConfig = {
    extends: ['@tywd/shared-configs/commitlint']
  };
  
  fs.writeJsonSync(path.join(projectRoot, 'commitlint.config.js'), commitlintConfig, { spaces: 2 });
}

async function setupHusky(projectRoot) {
  // Add husky script to package.json
  const pkgPath = path.join(projectRoot, 'package.json');
  const pkg = fs.readJsonSync(pkgPath);
  
  pkg.scripts = pkg.scripts || {};
  pkg.scripts.prepare = 'husky install';
  
  fs.writeJsonSync(pkgPath, pkg, { spaces: 2 });
  
  // Create husky directory structure
  const huskyDir = path.join(projectRoot, '.husky');
  fs.ensureDirSync(huskyDir);
  
  // Create commit-msg hook
  const commitMsgHook = `#!/bin/sh
. "\$(dirname "$0")/_/husky.sh"

npx --no-install commitlint --edit "$1"
`;
  fs.writeFileSync(path.join(huskyDir, 'commit-msg'), commitMsgHook);
  fs.chmodSync(path.join(huskyDir, 'commit-msg'), 0o755);
  
  // Create pre-commit hook
  const preCommitHook = `#!/bin/sh
. "\$(dirname "$0")/_/husky.sh"

npx lint-staged
`;
  fs.writeFileSync(path.join(huskyDir, 'pre-commit'), preCommitHook);
  fs.chmodSync(path.join(huskyDir, 'pre-commit'), 0o755);
  
  // Create lint-staged config
  const lintStagedConfig = {
    '*.{js,jsx,ts,tsx,vue}': ['eslint --fix', 'prettier --write'],
    '*.{css,scss,sass,less}': ['stylelint --fix', 'prettier --write'],
    '*.{json,md,yml,yaml}': ['prettier --write']
  };
  
  fs.writeJsonSync(path.join(projectRoot, '.lintstagedrc'), lintStagedConfig, { spaces: 2 });
}

module.exports = { initLinting };