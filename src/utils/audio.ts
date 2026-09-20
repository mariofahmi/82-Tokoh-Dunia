export function playTone(frequency: number, durationMs: number, type: OscillatorType = 'sine'): void {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (durationMs / 1000));

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + (durationMs / 1000));
  } catch {
    // Audio optional if browser prevents autoplay
  }
}

export function playSuccessSound(): void {
  playTone(587.33, 120); // D5
  setTimeout(() => {
    playTone(880, 220); // A5
  }, 100);
}

export function playWrongSound(): void {
  playTone(220, 220, 'sawtooth');
}
