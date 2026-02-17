/* eslint-disable-next-line @typescript-eslint/triple-slash-reference -- https://vitest.dev/guide/#configuring-vitest */
/// <reference types="vitest/config" />

import { readdirSync } from 'node:fs';
import { extname, join, relative, resolve } from 'node:path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const
  REQUIRED_COVERAGE = 80,
  rootForBuild = resolve(import.meta.dirname, 'src/frontend'),
  pagesDir = resolve(rootForBuild, 'pages'),

  findHtmlEntryPoints = (dir: string): string[] => readdirSync(dir, { withFileTypes: true, recursive: true })
    .filter(e => e.isFile() && e.name.endsWith('.html'))
    .map(e => join(e.parentPath, e.name)),

  input = Object.fromEntries(findHtmlEntryPoints(pagesDir).map(file => [
    relative(pagesDir, file.slice(0, -extname(file).length)).replaceAll('\\', '/'),
    file
  ])),

  alias = {
    '@': resolve(import.meta.dirname, 'src'),
    '/styles': resolve(rootForBuild, 'styles'),
    '/scripts': resolve(rootForBuild, 'scripts')
  };

export default defineConfig(({ command }) => ({
  root: command === 'serve' ? pagesDir : rootForBuild,
  publicDir: resolve(rootForBuild, 'assets'),
  plugins: [tsconfigPaths()],
  resolve: { alias },
  test: {
    root: resolve(import.meta.dirname),
    css: false,
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'json-summary', 'html'],
      thresholds: {
        statements: REQUIRED_COVERAGE,
        branches: REQUIRED_COVERAGE,
        functions: REQUIRED_COVERAGE,
        lines: REQUIRED_COVERAGE
      }
    },
    projects: [
      {
        resolve: { alias },
        test: {
          environment: 'jsdom',
          include: ['**/tests/frontend/**/*.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}']
        }
      },
      {
        resolve: { alias },
        test: {
          environment: 'node',
          include: ['**/tests/backend/**/*.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}']
        }
      }
    ]
  },
  build: {
    outDir: resolve(import.meta.dirname, 'dist/frontend'),
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