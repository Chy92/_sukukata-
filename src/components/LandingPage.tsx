import type { View } from '../types';

type LandingPageProps = {
  onChooseMode: (view: View) => void;
};

function LandingPage({ onChooseMode }: LandingPageProps) {
  return (
    <section className="screen landing-screen">
      <div className="hero-card bounce-in">
        <div className="sun">☀️</div>
        <p className="eyebrow">Bahasa Melayu Revision</p>
        <h1>Cari Suku Kata e</h1>
        <p className="hero-text">Jom cari suku kata vokal e sambil kumpul bintang!</p>

        <div className="mode-grid" aria-label="Choose user mode">
          <button className="mode-button parent-mode" onClick={() => onChooseMode('parent')}>
            <span className="mode-emoji">👨‍👩‍👧</span>
            <span>Parent</span>
          </button>

          <button className="mode-button child-mode" onClick={() => onChooseMode('child')}>
            <span className="mode-emoji">🧒</span>
            <span>Child</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default LandingPage;
