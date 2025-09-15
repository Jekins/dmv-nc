import { z } from 'zod';

export const localizedString = z.object({ ru: z.string(), en: z.string() });

export const questionSchema = z.object({
  id: z.string(),
  question: localizedString,
  options: z.record(z.string(), localizedString),
  answer: z.object({
    key: z.string(),
    description: localizedString,
  }),
});

export const chapterSchema = z.object({
  chapter: localizedString,
  questions: z.array(questionSchema),
});

export type LocalizedString = z.infer<typeof localizedString>;
export type Question = z.infer<typeof questionSchema>;
export type Chapter = z.infer<typeof chapterSchema>;
