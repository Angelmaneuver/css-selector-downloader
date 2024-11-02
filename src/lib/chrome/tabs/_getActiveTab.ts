function getActiveTab(callback: (tab: chrome.tabs.Tab) => void): void {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) =>
    callback(tabs[0]),
  );
}

export default getActiveTab;
