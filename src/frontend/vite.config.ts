import tsconfigPaths from 'vite-tsconfig-paths';

export default {
  plugins: [tsconfigPaths()],
  build: {
    outDir: '../../dist/frontend',
    emptyOutDir: true
  }
};