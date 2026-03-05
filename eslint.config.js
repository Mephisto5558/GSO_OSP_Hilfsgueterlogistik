/* eslint-disable @typescript-eslint/no-magic-numbers */

import config, { getModifiedRule, globals, jsGlob, pluginNames, plugins, tsGlob } from '@mephisto5558/eslint-config';

/**
 * @type {typeof config}
 * This config lists all rules from every plugin it uses. */
const eslintConfig = [
  ...config,
  {
    name: 'project-file:base',
    languageOptions: {
      parserOptions: {
        projectService: {
          defaultProject: './tsconfig.json',
          allowDefaultProject: [`*.config.${jsGlob}`, `*.config.${tsGlob}`]
        }
      }
    },
    rules: {
      [`${pluginNames.import}/no-unresolved`]: 'off', // Currently broken with v5's pre-release
      [`${pluginNames.css}/no-invalid-properties`]: 'off' // Currently broken
    }
  },
  {
    name: 'project-file:backend',
    files: ['src/backend/**'],
    languageOptions: {
      globals: globals.node
    },
    rules: {
      [`${pluginNames.import}/extensions`]: 'off', // Contradicts typescript's requirements
      [`${pluginNames.import}/prefer-default-export`]: 'off', // Required for dynamic loading logic
      ...getModifiedRule(config, 'new-cap', [{
        capIsNewExceptions: [
          'Router' // Express.js' Router is only a fake class
        ]
      }]),
      [`${pluginNames.sonar}/insecure-cookie`]: 'off' // Fine for a local server
    }
  },
  {
    name: 'project-file:frontend',
    files: ['src/frontend/**'],
    languageOptions: {
      globals: globals.browser
    },
    rules: {
      [`${pluginNames.typescript}/strict-void-return`]: 'off'
    }
  },
  {
    name: 'project-file:shared',
    files: ['src/shared/**'],
    languageOptions: {
      globals: {}
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
    name: 'tests:shared',
    files: ['tests/shared/**']
  },
  {
    name: 'project-overwrites',
    rules: {
      ...getModifiedRule(config, `${pluginNames.stylistic}/max-len`, [{
        code: 120
      }]),
      ...getModifiedRule(config, `${pluginNames.custom}/prefer-ternary`, [undefined, {
        maxLength: 120
      }])
    },
    plugins
  }
];

export default eslintConfig;