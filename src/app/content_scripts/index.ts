import * as Request from './request';

chrome.runtime.onMessage.addListener(
  (
    message: any,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: any) => void,
  ) => {
    if (typeof message !== 'object' || !('type' in message)) {
      console.error('Unknown request.');

      return true;
    }

    Request.get(message, sender, sendResponse);

    return true;
  },
);
