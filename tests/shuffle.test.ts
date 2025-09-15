import { describe, it, expect } from 'vitest';
import { shuffle } from '../src/utils/shuffle';

describe('shuffle', () => {
  it('is deterministic for same seed', () => {
    const arr = [1, 2, 3, 4, 5];
    expect(shuffle(arr, 42)).toEqual(shuffle(arr, 42));
  });
});
