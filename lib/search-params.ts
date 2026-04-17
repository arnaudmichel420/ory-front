export function createSearchParams(
  entries: Record<string, string | number | boolean | undefined>,
  arrayEntries: Record<string, Array<string | number> | undefined> = {},
) {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(entries)) {
    if (value !== undefined) {
      searchParams.set(key, String(value));
    }
  }

  for (const [key, values] of Object.entries(arrayEntries)) {
    for (const value of values ?? []) {
      searchParams.append(key, String(value));
    }
  }

  return searchParams;
}
