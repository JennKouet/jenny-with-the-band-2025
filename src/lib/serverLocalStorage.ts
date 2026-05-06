if (typeof window === "undefined") {
  const existingStorage = globalThis.localStorage as Storage | undefined;

  if (!existingStorage || typeof existingStorage.getItem !== "function") {
    const memoryStorage = new Map<string, string>();

    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      value: {
        get length() {
          return memoryStorage.size;
        },
        clear() {
          memoryStorage.clear();
        },
        getItem(key: string) {
          return memoryStorage.get(key) ?? null;
        },
        key(index: number) {
          return Array.from(memoryStorage.keys())[index] ?? null;
        },
        removeItem(key: string) {
          memoryStorage.delete(key);
        },
        setItem(key: string, value: string) {
          memoryStorage.set(key, value);
        },
      },
    });
  }
}

export {};
