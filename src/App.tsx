import { useEffect, useState } from 'react';
import ChildGame from './components/ChildGame';
import LandingPage from './components/LandingPage';
import ParentDashboard from './components/ParentDashboard';
import { loadProgress, loadSyllables, saveProgress, saveSyllables } from './utils/storage';
import type { Progress, Syllable, View } from './types';

function App() {
  const [view, setView] = useState<View>('landing');
  const [syllables, setSyllables] = useState<Syllable[]>(() => loadSyllables());
  const [progress, setProgress] = useState<Progress>(() => loadProgress());

  useEffect(() => {
    saveSyllables(syllables);
  }, [syllables]);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  return (
    <main className="app-shell">
      {view === 'landing' && <LandingPage onChooseMode={setView} />}

      {view === 'parent' && (
        <ParentDashboard
          syllables={syllables}
          progress={progress}
          onBack={() => setView('landing')}
          onUpdateSyllables={setSyllables}
          onUpdateProgress={setProgress}
        />
      )}

      {view === 'child' && (
        <ChildGame
          syllables={syllables}
          progress={progress}
          onBackToMenu={() => setView('landing')}
          onUpdateProgress={setProgress}
        />
      )}
    </main>
  );
}

export default App;
