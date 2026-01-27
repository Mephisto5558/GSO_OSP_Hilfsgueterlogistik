/* eslint-disable @typescript-eslint/no-magic-numbers */

import config, { getModifiedRule, plugins } from '@mephisto5558/eslint-config';

/**
 * @type {typeof config}
 * This config lists all rules from every plugin it uses. */
export default [
  ...config,
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