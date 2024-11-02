import * as Constant from '@/app/constants';

function get(
  message: any,
  _sender: chrome.runtime.MessageSender,
  sendResponse: (response?: any) => void,
): void {
  if (
    typeof message !== 'object' ||
    !('type' in message) ||
    !('query' in message) ||
    typeof message.query !== 'string'
  ) {
    return;
  }

  const result: Array<unknown> = [];

  for (const query of message.query.split('\n')) {
    const elements = document.body.querySelectorAll(query);

    switch (message.type) {
      case Constant.type.content.Get.Src:
      case Constant.type.content.Get.Href:
        const attribute = Constant.type.content.Get[message.type].toLowerCase();

        for (const element of elements) {
          if (element.hasAttribute(attribute)) {
            result.push(element.getAttribute(attribute));
          }
        }

        break;
    }
  }

  sendResponse(result);

  return;
}

export default get;
