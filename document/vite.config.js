import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  base: './',
  // root: 'src',
  // build: {
  //          outDir: path.resolve(__dirname, '/document/dist'),
  //       },
  server: {
    cors: { origin: "*" },
    proxy: {
      '/api': {
        target: 'http://313.co.kr/php/gnuboard5/bbs/board.php?bo_table=manual',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})