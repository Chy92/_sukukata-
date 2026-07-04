import { QUESTIONS_PER_GAME } from '../utils/game';
import { speak } from '../utils/speech';

type CompletionScreenProps = {
  stars: number;
  correct: number;
  onPlayAgain: () => void;
  onBackToMenu: () => void;
};

function CompletionScreen({ stars, correct, onPlayAgain, onBackToMenu }: CompletionScreenProps) {
  return (
    <section className="screen completion-screen">
      <div className="completion-card bounce-in">
        <div className="confetti" aria-hidden="true">
          🎉 ⭐ 🌈 🎉 ⭐
        </div>
        <h1>Tahniah!</h1>
        <p className="big-emoji" aria-hidden="true">
          🥳
        </p>
        <p className="completion-text">Adik berjaya habiskan permainan.</p>

        <div className="final-score-card">
          <p>Bintang dikumpul</p>
          <strong>{'⭐'.repeat(stars) || '✨'}</strong>
          <span>{stars} bintang</span>
        </div>

        <p className="correct-count">
          Betul: <strong>{correct}</strong> / {QUESTIONS_PER_GAME}
        </p>

        <div className="completion-actions">
          <button className="primary-button" onClick={onPlayAgain}>
            Main Lagi
          </button>
          <button className="secondary-button" onClick={onBackToMenu}>
            Kembali ke Menu
          </button>
          <button className="speaker-button" onClick={() => speak('Tahniah!')} aria-label="Read congratulations">
            🔊 Dengar
          </button>
        </div>
      </div>
    </section>
  );
}

export default CompletionScreen;
