import { resolve } from 'node:path';
import tsconfigPaths from 'vite-tsconfig-paths';

import type { UserConfig } from 'vite';

export default {
  plugins: [tsconfigPaths()],
  root: './src/frontend/',
  build: {
    outDir: '../../dist/frontend',
    sourcemap: true,
    emptyOutDir: true,
    minify: 'esbuild',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/frontend/pages/index.html')
      }
    }
  }
} as UserConfig;