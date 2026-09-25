import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  // Relative base path ensures asset links work seamlessly across:
  // 1. Local development (http://localhost:8080/)
  // 2. GitHub Pages (https://username.github.io/repository-name/)
  // 3. Custom Root Domains (https://customdomain.com/)
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
  server: {
    port: 8080,
  },
});
