import tsconfigPaths from 'vite-tsconfig-paths';

export default {
  plugins: [tsconfigPaths()],
  root: './src/frontend/pages',
  build: {
    outDir: '../../../dist/frontend',
    emptyOutDir: true
  }
};