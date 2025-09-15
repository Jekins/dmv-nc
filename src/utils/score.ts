export function computePercent(correct: number, total: number) {
  return Math.floor((correct / total) * 100);
}

export function isPassed(correct: number, total: number) {
  return computePercent(correct, total) >= 80;
}
