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
        cart: path.resolve(__dirname, 'src/pages/cart.html'),
        signin: path.resolve(__dirname, 'src/pages/signin.html'),
        signup: path.resolve(__dirname, 'src/pages/signup.html'),
        mapstore: path.resolve(__dirname, 'src/pages/mapstore.html'),
      },
    },
  },
  appType: 'mpa', // fallback 사용안함
});
