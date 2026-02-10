import { readdirSync } from 'node:fs';
import { extname, join, relative, resolve } from 'node:path';
import tsconfigPaths from 'vite-tsconfig-paths';

import type { UserConfig } from 'vite';

const
  root = resolve(__dirname, 'src/frontend'),
  pagesDir = resolve(root, 'pages');

function findHtmlEntryPoints(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) return findHtmlEntryPoints(fullPath);
    if (entry.isFile() && extname(entry.name) == '.html') return [fullPath];

    return [];
  });
}

const input = Object.fromEntries(findHtmlEntryPoints(pagesDir).map(file => [
  relative(root, file.slice(0, file.length - '.html'.length)).replaceAll('\\', '/'),
  file
]));

export default {
  plugins: [tsconfigPaths()],
  root: './src/frontend/',
  build: {
    outDir: '../../dist/frontend',
    sourcemap: true,
    emptyOutDir: true,
    minify: 'esbuild',
    rollupOptions: { input }
  }
} as UserConfig;