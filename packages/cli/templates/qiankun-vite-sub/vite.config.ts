import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import qiankun from 'vite-plugin-qiankun'

// 添加 Node.js 类型声明
/// <reference types="node" />

// 在 ES 模块中获取 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig(({ mode }: { mode: string }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), '');
  
  // 根据环境设置base路径
  const isProd = mode === 'production';
  const basePath = isProd ? (env.BASE_PATH || '/sub-app/') : '/';
  
  return {
  base: basePath, // 设置基础路径，确保在Vercel上正确部署
  plugins: [
    vue(),
    qiankun('sub-app', {
      useDevMode: mode !== 'production'
    })
  ],
  define: {
    // 在生产环境中定义生产环境变量
    __VUE_PROD_DEVTOOLS__: false,
    // 移除硬编码的NODE_ENV，让Vite自动处理
  },
  server: {
    port: env.PORT ? parseInt(env.PORT, 10) : 8081,
    host: '0.0.0.0',
    cors: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        // 更通用的分块策略
        manualChunks: (id: string) => {
          if (id.includes('node_modules')) {
            if (id.includes('vue')) {
              return 'vue-vendor';
            }
            if (id.includes('element-plus')) {
              return 'element-vendor';
            }
            return 'vendor';
          }
        }
      }
    },
    cssCodeSplit: true,
    chunkSizeWarningLimit: 500,
    sourcemap: false,
    minify: 'terser',
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    }
  },
  css: {
    modules: {
      generateScopedName: '[name]__[local]___[hash:base64:5]'
    },
    // 确保在生产环境中不丢失CSS
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/variables.scss" as *;`
      }
    }
  },
  // 添加这个配置来解决undici相关的问题
  optimizeDeps: {
    include: ['vue', 'vue-router', 'element-plus', '@element-plus/icons-vue'],
    exclude: ['undici']
  }
  }
})