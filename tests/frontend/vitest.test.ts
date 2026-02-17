import { describe, expect, it } from 'vitest';

describe('Demo Test', () => {
  it('should have a DOM environment (jsdom)', () => {
    const element = document.createElement('div');
    expect(element).toBeInstanceOf(HTMLDivElement);
  });
});