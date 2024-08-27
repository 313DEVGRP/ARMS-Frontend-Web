import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const VITE_ASSET_URL = import.meta.env.VITE_ASSET_URL || '';

export default defineConfig({
  plugins: [react()],
 // base: import.meta.env.VITE_ASSET_URL,
  server: {
    fs: {
      // 1레벨 프로젝트 루트까지 파일 접속 허용
      allow: ['..'],
    },
    proxy: {
      '/api': {
        target: 'http://313.co.kr/php/gnuboard5/bbs/board.php?bo_table=manual',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    '/': {
      target: 'http://313.co.kr/php/gnuboard5/bbs/board.php?bo_table=manual',
      changeOrigin: true,
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: '/document/dist/',
  build: {
    outDir: 'document/dist'
  },
})