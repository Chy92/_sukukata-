import { useEffect, useMemo, useState } from 'react';
import type { FeedbackState, Progress, Question, Syllable } from '../types';
import { createQuestion, QUESTIONS_PER_GAME } from '../utils/game';
import { speak } from '../utils/speech';
import CompletionScreen from './CompletionScreen';
import SyllableCard from './SyllableCard';

type ChildGameProps = {
  syllables: Syllable[];
  progress: Progress;
  onBackToMenu: () => void;
  onUpdateProgress: (progress: Progress) => void;
};

type SessionStats = {
  answered: number;
  correct: number;
  wrong: number;
  stars: number;
};

const initialSession: SessionStats = {
  answered: 0,
  correct: 0,
  wrong: 0,
  stars: 0,
};

function ChildGame({ syllables, progress, onBackToMenu, onUpdateProgress }: ChildGameProps) {
  const enabledSyllables = useMemo(() => syllables.filter((item) => item.enabled), [syllables]);
  const [question, setQuestion] = useState<Question | null>(() =>
    enabledSyllables.length >= 3 ? createQuestion(enabledSyllables) : null,
  );
  const [session, setSession] = useState<SessionStats>(initialSession);
  const [feedback, setFeedback] = useState<FeedbackState>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!question && enabledSyllables.length >= 3) {
      setQuestion(createQuestion(enabledSyllables));
    }
  }, [enabledSyllables, question, syllables]);

  function readInstruction() {
    if (!question) return;
    speak(`Cari suku kata ${question.target.text}`);
  }

  function startNewGame() {
    const nextQuestion = createQuestion(enabledSyllables);
    setQuestion(nextQuestion);
    setSession(initialSession);
    setFeedback(null);
    setSelectedId(null);
    setIsComplete(false);
    speak('Jom main lagi!');
  }

  function goToNextQuestion(nextAnswered: number) {
    const isLastQuestion = nextAnswered >= QUESTIONS_PER_GAME;

    window.setTimeout(() => {
      setFeedback(null);
      setSelectedId(null);

      if (isLastQuestion) {
        setIsComplete(true);
        speak('Tahniah!');
        return;
      }

      setQuestion(createQuestion(enabledSyllables));
    }, 1100);
  }

  function handleAnswer(choice: Syllable) {
    if (!question || feedback) return;

    const isCorrect = choice.id === question.target.id;
    const feedbackMessage = isCorrect ? 'Bagus! Betul!' : 'Cuba lagi!';
    const nextSession: SessionStats = {
      answered: session.answered + 1,
      correct: session.correct + (isCorrect ? 1 : 0),
      wrong: session.wrong + (isCorrect ? 0 : 1),
      stars: session.stars + (isCorrect ? 1 : 0),
    };

    const nextStreak = isCorrect ? progress.currentStreak + 1 : 0;
    const nextProgress: Progress = {
      ...progress,
      totalAnswered: progress.totalAnswered + 1,
      correctAnswers: progress.correctAnswers + (isCorrect ? 1 : 0),
      wrongAnswers: progress.wrongAnswers + (isCorrect ? 0 : 1),
      currentStreak: nextStreak,
      bestStreak: Math.max(progress.bestStreak, nextStreak),
      starsEarned: progress.starsEarned + (isCorrect ? 1 : 0),
      gamesCompleted: nextSession.answered >= QUESTIONS_PER_GAME ? progress.gamesCompleted + 1 : progress.gamesCompleted,
      lastPlayedDate: new Date().toISOString(),
    };

    setSelectedId(choice.id);
    setFeedback({ type: isCorrect ? 'correct' : 'wrong', message: feedbackMessage });
    setSession(nextSession);
    onUpdateProgress(nextProgress);
    speak(feedbackMessage);
    goToNextQuestion(nextSession.answered);
  }

  if (enabledSyllables.length < 3) {
    return (
      <section className="screen child-screen">
        <div className="game-card empty-game-card">
          <p className="big-emoji">🌟</p>
          <h1>Perlu 3 suku kata</h1>
          <p>Parent perlu aktifkan sekurang-kurangnya 3 suku kata untuk mula bermain.</p>
          <button className="primary-button" onClick={onBackToMenu}>
            Kembali ke Menu
          </button>
        </div>
      </section>
    );
  }

  if (isComplete) {
    return (
      <CompletionScreen
        stars={session.stars}
        correct={session.correct}
        onPlayAgain={startNewGame}
        onBackToMenu={onBackToMenu}
      />
    );
  }

  if (!question) return null;

  const progressPercent = (session.answered / QUESTIONS_PER_GAME) * 100;

  return (
    <section className="screen child-screen">
      <header className="game-header">
        <button className="small-button" onClick={onBackToMenu} aria-label="Back to menu">
          ← Menu
        </button>
        <div className="stars-counter" aria-label={`${session.stars} stars collected`}>
          ⭐ {session.stars}
        </div>
      </header>

      <div className="game-card">
        <div className="progress-track" aria-label={`Question ${session.answered + 1} of ${QUESTIONS_PER_GAME}`}>
          <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>

        <p className="question-count">
          Soalan {session.answered + 1} / {QUESTIONS_PER_GAME}
        </p>

        <div className="instruction-card">
          <p>Cari suku kata:</p>
          <h1>{question.target.text}</h1>
          <button className="speaker-button" onClick={readInstruction} aria-label="Read instruction aloud">
            🔊 Dengar
          </button>
        </div>

        <div className="answer-grid" aria-label="Answer choices">
          {question.choices.map((choice) => (
            <SyllableCard
              key={choice.id}
              syllable={choice}
              disabled={Boolean(feedback)}
              isCorrect={Boolean(feedback && choice.id === question.target.id)}
              isWrong={Boolean(feedback?.type === 'wrong' && selectedId === choice.id)}
              onChoose={handleAnswer}
            />
          ))}
        </div>

        {feedback && (
          <div className={`feedback-bubble ${feedback.type}`} role="status" aria-live="polite">
            <span className="feedback-emoji">{feedback.type === 'correct' ? '😄' : '🙂'}</span>
            <strong>{feedback.message}</strong>
            {feedback.type === 'correct' && <span className="mini-confetti">🎉 ⭐ 🎉</span>}
          </div>
        )}
      </div>
    </section>
  );
}

export default ChildGame;
