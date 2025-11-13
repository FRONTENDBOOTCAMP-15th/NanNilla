import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
export default defineConfig({
  plugins: [tailwindcss()],

  build: {
    rollupOptions: {
      input: {
        // 메인 페이지
        index: 'index.html',

        itemlist: path.resolve(__dirname, 'src/pages/itemlist.html'),
        itemdetail: path.resolve(__dirname, 'src/pages/itemdetail.html'),
      },
    },
  },
  appType: 'mpa', // fallback 사용안함
});
