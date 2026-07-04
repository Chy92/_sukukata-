import type { Question, Syllable } from '../types';

export const QUESTIONS_PER_GAME = 10;

export function shuffleArray<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

export function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function createQuestion(enabledSyllables: Syllable[]): Question {
  const target = pickRandom(enabledSyllables);
  const wrongChoices = shuffleArray(enabledSyllables.filter((item) => item.id !== target.id)).slice(0, 2);

  return {
    target,
    choices: shuffleArray([target, ...wrongChoices]),
  };
}

export function getAccuracy(correctAnswers: number, totalAnswered: number): number {
  if (totalAnswered === 0) return 0;
  return Math.round((correctAnswers / totalAnswered) * 100);
}

export function formatDateTime(value: string | null): string {
  if (!value) return 'Belum dimainkan';

  return new Intl.DateTimeFormat('ms-MY', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}
