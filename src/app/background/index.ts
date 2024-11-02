const requests: Record<number, string> = {} as const;

chrome.runtime.onMessage.addListener(
  (
    message: any,
    _sender: chrome.runtime.MessageSender,
    _sendResponse: (response?: any) => void,
  ) => {
    if (typeof message !== 'object') {
      return;
    }

    if (!('urls' in message)) {
      return;
    }

    if (!Array.isArray(message.urls)) {
      return;
    }

    const data = message as {
      urls: Array<string>;
      template?: string;
    };

    const digits = data.urls.length.toString().length;

    for (const [index, url] of data.urls.entries()) {
      chrome.downloads.download({ url }).then((id) => {
        if (data.template) {
          requests[id] =
            `${data.template}${data.urls.length > 1 ? (index + 1).toString().padStart(digits, '0') : ''}`;
        }
      });
    }
  },
);

chrome.downloads.onDeterminingFilename.addListener((downloadItem, suggest) => {
  if (!(downloadItem.id in requests)) {
    return;
  }

  const [_, extension] = downloadItem.mime.split('/');

  const filename = `${requests[downloadItem.id]}.${extension}`;

  delete requests[downloadItem.id];

  suggest({ filename: filename });
});
