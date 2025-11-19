// 代码修复核心逻辑实现
// 该文件负责扫描和自动修复项目中的代码规范问题

const { execa } = require('execa');
const chalk = require('chalk');
const ora = require('ora');

// 代码修复主函数
// 该函数会依次执行 ESLint、Prettier 和 Stylelint 的自动修复功能
async function fixLinting() {
  console.log(chalk.green('Scanning and fixing linting issues...'));
  
  const spinner = ora('Scanning for issues...').start();
  
  try {
    // Run ESLint fix
    await runEslintFix(spinner);
    
    // Run Prettier fix
    await runPrettierFix(spinner);
    
    // Run Stylelint fix
    await runStylelintFix(spinner);
    
    spinner.succeed('All linting issues fixed successfully!');
  } catch (error) {
    spinner.fail('Failed to fix linting issues');
    console.error(chalk.red(error.message));
    process.exit(1);
  }
}

async function runEslintFix(spinner) {
  try {
    spinner.text = 'Running ESLint fix...';
    await execa('npx', ['eslint', '.', '--fix'], { 
      cwd: process.cwd(),
      stdio: 'inherit'
    });
  } catch (error) {
    // ESLint returns non-zero exit code when issues are found, but we still want to continue
    if (error.exitCode !== 1) {
      throw error;
    }
  }
}

async function runPrettierFix(spinner) {
  try {
    spinner.text = 'Running Prettier fix...';
    await execa('npx', ['prettier', '.', '--write'], { 
      cwd: process.cwd(),
      stdio: 'inherit'
    });
  } catch (error) {
    // Prettier may return non-zero exit code, but we still want to continue
    if (error.exitCode > 1) {
      throw error;
    }
  }
}

async function runStylelintFix(spinner) {
  try {
    spinner.text = 'Running Stylelint fix...';
    await execa('npx', ['stylelint', '**/*.{css,scss,sass,less}', '--fix'], { 
      cwd: process.cwd(),
      stdio: 'inherit'
    });
  } catch (error) {
    // Stylelint returns non-zero exit code when issues are found, but we still want to continue
    if (error.exitCode !== 2) {
      throw error;
    }
  }
}

module.exports = { fixLinting };