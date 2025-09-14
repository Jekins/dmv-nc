import { chapterSchema, type Chapter } from '../types';
import { z } from 'zod';

const modules = import.meta.glob('../../data/*.json', { eager: true });

export const sections: Record<string, Chapter> = {};
export const loadErrors: Record<string, z.ZodError> = {};

for (const [path, mod] of Object.entries(modules)) {
  const data = (mod as { default: unknown }).default;
  const parsed = chapterSchema.safeParse(data);
  const id = path.split('/').pop()?.replace('.json', '') || path;
  if (parsed.success) {
    sections[id] = parsed.data;
  } else {
    loadErrors[id] = parsed.error;
    if (import.meta.env.DEV) {
      console.error(`Invalid data at ${path}`, parsed.error);
    }
  }
}
