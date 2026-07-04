import type { Progress } from '../types';
import { formatDateTime, getAccuracy } from '../utils/game';

type ProgressSummaryProps = {
  progress: Progress;
};

function ProgressSummary({ progress }: ProgressSummaryProps) {
  const accuracy = getAccuracy(progress.correctAnswers, progress.totalAnswered);

  return (
    <section className="panel progress-panel" aria-labelledby="progress-title">
      <h2 id="progress-title">Progress Anak</h2>

      <div className="summary-grid">
        <article className="summary-card">
          <span className="summary-icon">🎯</span>
          <p>Total answered</p>
          <strong>{progress.totalAnswered}</strong>
        </article>

        <article className="summary-card">
          <span className="summary-icon">✅</span>
          <p>Correct answers</p>
          <strong>{progress.correctAnswers}</strong>
        </article>

        <article className="summary-card">
          <span className="summary-icon">🌧️</span>
          <p>Wrong answers</p>
          <strong>{progress.wrongAnswers}</strong>
        </article>

        <article className="summary-card">
          <span className="summary-icon">⭐</span>
          <p>Stars earned</p>
          <strong>{progress.starsEarned}</strong>
        </article>
      </div>

      <div className="progress-details">
        <p>
          <span>Accuracy</span>
          <strong>{accuracy}%</strong>
        </p>
        <p>
          <span>Current streak</span>
          <strong>{progress.currentStreak}</strong>
        </p>
        <p>
          <span>Best streak</span>
          <strong>{progress.bestStreak}</strong>
        </p>
        <p>
          <span>Games completed</span>
          <strong>{progress.gamesCompleted}</strong>
        </p>
        <p>
          <span>Last played</span>
          <strong>{formatDateTime(progress.lastPlayedDate)}</strong>
        </p>
      </div>
    </section>
  );
}

export default ProgressSummary;
