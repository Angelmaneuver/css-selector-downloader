function requestDownloads(
  tab: chrome.tabs.Tab,
  urls: Array<string>,
  template?: string,
): void {
  const site = new URL(tab.url!);

  const downloadlinks = urls.map((url) => {
    if (
      url.startsWith('https://') ||
      url.startsWith('http://') ||
      url.startsWith('data:')
    ) {
      return url;
    }

    const downloadlink = new URL(url, site.origin);

    return downloadlink.href;
  });

  chrome.runtime.sendMessage({ urls: downloadlinks, template: template });
}

export default requestDownloads;
