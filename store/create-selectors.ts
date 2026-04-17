import type { StoreApi, UseBoundStore } from "zustand";

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & {
      use: {
        [K in keyof T]: () => T[K];
      };
    }
  : never;

export function createSelectors<S extends UseBoundStore<StoreApi<object>>>(
  store: S,
) {
  const storeWithSelectors = store as WithSelectors<S>;
  const selectors = {} as WithSelectors<S>["use"];

  for (const key of Object.keys(store.getState())) {
    (selectors as Record<string, () => unknown>)[key] = () =>
      store((state) => state[key as keyof typeof state]);
  }

  storeWithSelectors.use = selectors;

  return storeWithSelectors;
}
