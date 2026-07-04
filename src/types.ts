export type View = 'landing' | 'parent' | 'child';

export type Syllable = {
  id: string;
  text: string;
  enabled: boolean;
};

export type Progress = {
  totalAnswered: number;
  correctAnswers: number;
  wrongAnswers: number;
  currentStreak: number;
  bestStreak: number;
  starsEarned: number;
  gamesCompleted: number;
  lastPlayedDate: string | null;
};

export type Question = {
  target: Syllable;
  choices: Syllable[];
};

export type FeedbackState = {
  type: 'correct' | 'wrong';
  message: string;
} | null;
