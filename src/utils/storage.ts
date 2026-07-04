import { DEFAULT_SYLLABLES } from '../data/syllables';
import type { Progress, Syllable } from '../types';

const SYLLABLES_KEY = 'cari-suku-kata-e:syllables';
const PROGRESS_KEY = 'cari-suku-kata-e:progress';

export const defaultProgress: Progress = {
  totalAnswered: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
  currentStreak: 0,
  bestStreak: 0,
  starsEarned: 0,
  gamesCompleted: 0,
  lastPlayedDate: null,
};

function canUseLocalStorage() {
  return typeof window !== 'undefined' && 'localStorage' in window;
}

export function loadSyllables(): Syllable[] {
  if (!canUseLocalStorage()) return DEFAULT_SYLLABLES;

  try {
    const saved = window.localStorage.getItem(SYLLABLES_KEY);
    if (!saved) return DEFAULT_SYLLABLES;

    const parsed = JSON.parse(saved) as Syllable[];
    if (!Array.isArray(parsed)) return DEFAULT_SYLLABLES;

    // Merge with defaults so newly added syllables appear in future updates.
    return DEFAULT_SYLLABLES.map((defaultItem) => {
      const savedItem = parsed.find((item) => item.id === defaultItem.id);
      return savedItem ? { ...defaultItem, enabled: Boolean(savedItem.enabled) } : defaultItem;
    });
  } catch {
    return DEFAULT_SYLLABLES;
  }
}

export function saveSyllables(syllables: Syllable[]) {
  if (!canUseLocalStorage()) return;
  window.localStorage.setItem(SYLLABLES_KEY, JSON.stringify(syllables));
}

export function loadProgress(): Progress {
  if (!canUseLocalStorage()) return defaultProgress;

  try {
    const saved = window.localStorage.getItem(PROGRESS_KEY);
    if (!saved) return defaultProgress;

    const parsed = JSON.parse(saved) as Partial<Progress>;
    return {
      ...defaultProgress,
      ...parsed,
      totalAnswered: Number(parsed.totalAnswered ?? 0),
      correctAnswers: Number(parsed.correctAnswers ?? 0),
      wrongAnswers: Number(parsed.wrongAnswers ?? 0),
      currentStreak: Number(parsed.currentStreak ?? 0),
      bestStreak: Number(parsed.bestStreak ?? 0),
      starsEarned: Number(parsed.starsEarned ?? 0),
      gamesCompleted: Number(parsed.gamesCompleted ?? 0),
      lastPlayedDate: parsed.lastPlayedDate ?? null,
    };
  } catch {
    return defaultProgress;
  }
}

export function saveProgress(progress: Progress) {
  if (!canUseLocalStorage()) return;
  window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

export function resetProgress(): Progress {
  saveProgress(defaultProgress);
  return defaultProgress;
}
