import { describe, expect, it } from 'vitest';

describe('Demo Test', () => {
  it('should not have a DOM environment (jsdom)', () => {
    /* eslint-disable @typescript-eslint/no-unsafe-return,
      @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */// @ts-expect-error vitest testing
    expect(() => document.createElement('div')).toThrowError(ReferenceError);
    /* eslint-enable */
  });

  it('should have a Node environment', () => {
    // @ts-expect-error vitest testing
    expect(globalThis.window).toBeUndefined();
  });
});