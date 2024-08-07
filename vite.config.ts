import { defineConfig } from 'vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      name: 'lowbot-plugin',
      entry: resolve(__dirname, 'src/main.ts'),
      formats: ['es', 'cjs', 'umd'],
    },
  },
  resolve: { alias: { src: resolve('src/') } },
});
