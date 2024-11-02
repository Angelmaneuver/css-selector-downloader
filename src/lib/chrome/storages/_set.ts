function set<T extends Record<string, unknown> = Record<string, unknown>>(
  items: T,
) {
  chrome.storage.local.set<T>(items);
}

export default set;
