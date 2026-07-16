/** Formats compact counters consistently across the portfolio. */
export function formatCounter(value: number): string {
  return String(value).padStart(2, "0");
}

/** Returns the first occurrence of each value while preserving its order. */
export function uniqueValues<T>(values: readonly T[]): T[] {
  return [...new Set(values)];
}
