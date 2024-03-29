export function randomElement<T>(array: T[]): T {
  return shuffle(array)[0];
}

export function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

export function sort(array: string[]): string[] {
  return array.sort((a, b) => a.localeCompare(b));
}
