import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
import ts from 'typescript';

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      compilerOptions: {
        moduleResolution: ts.ModuleResolutionKind.Bundler,
      },
    }),
  ],
  build: {
    lib: {
      name: 'flowgen',
      entry: resolve(__dirname, 'src/main.ts'),
      formats: ['es', 'cjs', 'umd'],
    },
  },
  resolve: { alias: { src: resolve('src/') } },
});
