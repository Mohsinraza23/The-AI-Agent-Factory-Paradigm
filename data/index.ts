export interface Question {
  id: number;
  question: string;
  options: [string, string, string, string];
  correct: 0 | 1 | 2 | 3;
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  topics: number;
  questions: Question[];
}

import { chapter12 } from "./chapter12";
import { chapter13 } from "./chapter13";
import { chapter14 } from "./chapter14";
import { chapter56 } from "./chapter56";
import { chapter57 } from "./chapter57";

export const chapters: Chapter[] = [chapter12, chapter13, chapter14, chapter56, chapter57];

export function getChapter(id: string): Chapter | undefined {
  return chapters.find((c) => c.id === id);
}
