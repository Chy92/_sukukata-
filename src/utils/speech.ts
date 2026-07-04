export function speak(text: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ms-MY';
  utterance.rate = 0.85;
  utterance.pitch = 1.15;
  window.speechSynthesis.speak(utterance);
}
