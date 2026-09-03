import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/easify-vocab/',
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  server: {
    open: true,
  },
  resolve: {
    alias: [
      { find: '@components', replacement: fileURLToPath(new URL('./src/components', import.meta.url)) },
      { find: '@assets', replacement: fileURLToPath(new URL('./src/assets', import.meta.url)) },
      { find: '@styles', replacement: fileURLToPath(new URL('./src/styles', import.meta.url)) },
    ],
  },
});
