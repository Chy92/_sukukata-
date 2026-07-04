import { DEFAULT_SYLLABLES } from '../data/syllables';
import type { Progress, Syllable } from '../types';
import { resetProgress } from '../utils/storage';
import ProgressSummary from './ProgressSummary';

type ParentDashboardProps = {
  syllables: Syllable[];
  progress: Progress;
  onBack: () => void;
  onUpdateSyllables: (syllables: Syllable[]) => void;
  onUpdateProgress: (progress: Progress) => void;
};

function ParentDashboard({
  syllables,
  progress,
  onBack,
  onUpdateSyllables,
  onUpdateProgress,
}: ParentDashboardProps) {
  const enabledCount = syllables.filter((item) => item.enabled).length;

  function toggleSyllable(id: string) {
    const target = syllables.find((item) => item.id === id);
    if (!target) return;

    // Keep at least 3 enabled syllables so the child always sees 3 answer cards.
    if (target.enabled && enabledCount <= 3) return;

    onUpdateSyllables(
      syllables.map((item) => (item.id === id ? { ...item, enabled: !item.enabled } : item)),
    );
  }

  function enableAll() {
    onUpdateSyllables(syllables.map((item) => ({ ...item, enabled: true })));
  }

  function restoreDefaults() {
    onUpdateSyllables(DEFAULT_SYLLABLES);
  }

  function handleResetProgress() {
    const nextProgress = resetProgress();
    onUpdateProgress(nextProgress);
  }

  return (
    <section className="screen dashboard-screen">
      <header className="top-bar">
        <button className="small-button" onClick={onBack} aria-label="Back to menu">
          ← Menu
        </button>
        <div>
          <p className="eyebrow">Parent Mode</p>
          <h1>Setup & Progress</h1>
        </div>
      </header>

      <ProgressSummary progress={progress} />

      <section className="panel" aria-labelledby="syllable-title">
        <div className="section-heading">
          <div>
            <h2 id="syllable-title">Suku Kata e</h2>
            <p>Pilih suku kata untuk latihan anak. Minimum 3 perlu aktif.</p>
          </div>
          <span className="pill">{enabledCount} aktif</span>
        </div>

        <div className="syllable-toggle-grid">
          {syllables.map((syllable) => {
            const locked = syllable.enabled && enabledCount <= 3;

            return (
              <button
                key={syllable.id}
                className={`toggle-card ${syllable.enabled ? 'enabled' : 'disabled'}`}
                onClick={() => toggleSyllable(syllable.id)}
                aria-pressed={syllable.enabled}
                title={locked ? 'Minimum 3 syllables must stay enabled' : undefined}
              >
                <span>{syllable.text}</span>
                <small>{syllable.enabled ? 'On' : 'Off'}</small>
              </button>
            );
          })}
        </div>

        <div className="dashboard-actions">
          <button className="secondary-button" onClick={enableAll}>
            Enable All
          </button>
          <button className="secondary-button" onClick={restoreDefaults}>
            Restore Default
          </button>
          <button className="danger-button" onClick={handleResetProgress}>
            Reset Progress
          </button>
        </div>
      </section>
    </section>
  );
}

export default ParentDashboard;
