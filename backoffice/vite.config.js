import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import '@/styles/variables';
          @import '@/styles/variables-dark';
        `,
        quietDeps: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'backoffice/dist/assets/[name]-[hash].js',
        chunkFileNames: 'backoffice/dist/assets/[name]-[hash].js',
        assetFileNames: 'backoffice/dist/assets/[name]-[hash][extname]',
      },
    },
  },
});
