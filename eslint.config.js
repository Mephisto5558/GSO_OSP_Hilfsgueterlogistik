/* eslint-disable @typescript-eslint/no-magic-numbers */

import config, { getModifiedRule, plugins } from '@mephisto5558/eslint-config';

/**
 * @type {typeof config}
 * This config lists all rules from every plugin it uses. */
export default [
  ...config,
  {
    name: 'project-file:base',
    languageOptions: {
      parserOptions: {
        project: './tsconfig.base.json'
      }
    }
  },
  {
    name: 'project-file:frontend',
    files: ['src/backend/**'],
    languageOptions: {
      parserOptions: {
        project: './src/backend/tsconfig.json'
      }
    }
  },
  {
    name: 'project-file:backend',
    files: ['src/frontend/**'],
    languageOptions: {
      parserOptions: {
        project: './src/frontend/tsconfig.json'
      }
    }
  },
  {
    name: 'project-file:shared',
    files: ['src/shared/**'],
    languageOptions: {
      parserOptions: {
        project: './src/shared/tsconfig.json'
      }
    }
  },
  {
    name: 'project-overwrites',
    rules: {
      '@stylistic/max-len': getModifiedRule(config, '@stylistic/max-len', {
        code: 120
      })
    },
    plugins
  }
];