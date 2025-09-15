import seedrandom from 'seedrandom';

export function shuffle<T>(arr: T[], seed: string | number): T[] {
  const rng = seedrandom(String(seed));
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
