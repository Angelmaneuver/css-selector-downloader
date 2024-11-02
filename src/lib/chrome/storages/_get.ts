function get<T extends Record<string, unknown> = Record<string, unknown>>(
  keys: Array<string>,
  callback: (items: Partial<T> | undefined) => void,
): void {
  chrome.storage.local.get<T>(keys, (items) =>
    callback(chrome.runtime.lastError ? undefined : items),
  );
}

export default get;
