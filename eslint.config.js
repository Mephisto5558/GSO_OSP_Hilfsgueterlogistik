/* eslint-disable @typescript-eslint/no-magic-numbers */

import config, { getModifiedRule, globals, plugins } from '@mephisto5558/eslint-config';

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
    name: 'project-file:backend',
    files: ['src/backend/**'],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        project: './src/backend/tsconfig.json'
      }
    }
  },
  {
    name: 'project-file:frontend',
    files: ['src/frontend/**'],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        project: './src/frontend/tsconfig.json'
      }
    }
  },
  {
    name: 'project-file:shared',
    files: ['src/shared/**'],
    languageOptions: {
      globals: {},
      parserOptions: {
        project: './src/shared/tsconfig.json'
      }
    }
  },
  {
    name: 'tests:base',
    files: ['tests/**'],
    languageOptions: {
      parserOptions: {
        project: './tests/tsconfig.json'
      }
    }
  },
  {
    name: 'tests:frontend',
    files: ['tests/frontend/**'],
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  },
  {
    name: 'tests:backend',
    files: ['tests/backend/**'],
    languageOptions: {
      globals: globals.node
    }
  },
  {
    name: 'project-overwrites',
    rules: {
      '@stylistic/max-len': getModifiedRule(config, '@stylistic/max-len', {
        code: 120
      }),
      'custom/prefer-ternary': getModifiedRule(config, 'custom/prefer-ternary', undefined, {
        maxLength: 120
      })
    },
    plugins
  }
];