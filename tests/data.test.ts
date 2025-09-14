import { describe, it, expect } from 'vitest';
import { sections } from '../src/data';

describe('data parsing', () => {
  it('loads chapter', () => {
    expect(Object.keys(sections).length).toBeGreaterThan(0);
  });
});
