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
import { readdirSync } from 'node:fs';
import { extname, join, relative, resolve } from 'node:path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const
  rootForBuild = resolve(import.meta.dirname, 'src/frontend'),
  pagesDir = resolve(rootForBuild, 'pages'),

  findHtmlEntryPoints = (dir: string): string[] => readdirSync(dir, { withFileTypes: true, recursive: true })
    .filter(e => e.isFile() && e.name.endsWith('.html'))
    .map(e => join(e.parentPath, e.name)),

  input = Object.fromEntries(findHtmlEntryPoints(pagesDir).map(file => [
    relative(pagesDir, file.slice(0, -extname(file).length)).replaceAll('\\', '/'),
    file
  ]));

export default defineConfig(({ command }) => ({
  root: command === 'serve' ? pagesDir : rootForBuild,
  publicDir: resolve(rootForBuild, 'assets'),
  plugins: [tsconfigPaths()],
  resolve: {
    alias: {
      '/styles': resolve(rootForBuild, 'styles'),
      '/scripts': resolve(rootForBuild, 'scripts')
    }
  },
  build: {
    outDir: '../../../dist/frontend',
    sourcemap: true,
    emptyOutDir: true,
    minify: 'esbuild',
    rollupOptions: {
      input,
      output: {
        entryFileNames: 'assets/[name].entry-[hash].js',
        chunkFileNames: 'assets/[name].chunk-[hash].js',
        assetFileNames: 'assets/[name].asset-[hash].[ext]'
      }
    }
  }
}));