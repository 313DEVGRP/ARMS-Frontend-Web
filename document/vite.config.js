import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    cors: { origin: "*" },
    fs: {
      // 1레벨 프로젝트 루트까지 파일 접속 허용
      allow: ['..'],
    },
    proxy: {
      '/php': {
        target: 'http://313.co.kr',
        changeOrigin: true
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'document/dist/assets/[name]-[hash].js',
        chunkFileNames: 'document/dist/assets/[name]-[hash].js',
        assetFileNames: 'document/dist/assets/[name]-[hash][extname]',
      },
    },
  }
})