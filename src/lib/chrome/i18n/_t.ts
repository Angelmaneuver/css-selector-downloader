const MESSAGE_PREFIX = 'CSS_SELECTOR_DOWNLOADER_';

function t(message: string) {
  return chrome.i18n.getMessage(`${MESSAGE_PREFIX}${message}`);
}

export default t;
