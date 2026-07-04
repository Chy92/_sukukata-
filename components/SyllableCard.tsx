import type { Syllable } from '../types';

type SyllableCardProps = {
  syllable: Syllable;
  disabled: boolean;
  isCorrect?: boolean;
  isWrong?: boolean;
  onChoose: (syllable: Syllable) => void;
};

function SyllableCard({ syllable, disabled, isCorrect, isWrong, onChoose }: SyllableCardProps) {
  const classNames = ['syllable-card'];
  if (isCorrect) classNames.push('correct-card');
  if (isWrong) classNames.push('wrong-card');

  return (
    <button className={classNames.join(' ')} disabled={disabled} onClick={() => onChoose(syllable)}>
      <span className="card-star">⭐</span>
      <strong>{syllable.text}</strong>
    </button>
  );
}

export default SyllableCard;
