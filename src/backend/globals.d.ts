/* eslint-disable @typescript-eslint/consistent-type-definitions -- required for interface merging */

/* eslint-disable-next-line import-x/no-namespace -- required to load global definitions in */
import type * as __ from '@mephisto5558/better-types';

declare module 'express-serve-static-core' {
  interface ILayer {
    match(path: string): boolean;
  }

  interface IRoute {
    methods: Record<string, boolean>;
  }
}