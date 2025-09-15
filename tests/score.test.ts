import { describe, it, expect } from 'vitest';
import { isPassed } from '../src/utils/score';

describe('score', () => {
  it('passes at 8/10', () => {
    expect(isPassed(8, 10)).toBe(true);
  });
  it('fails at 7/10', () => {
    expect(isPassed(7, 10)).toBe(false);
  });
});
