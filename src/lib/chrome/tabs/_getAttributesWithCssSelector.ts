import * as Constant from '@/app/constants';

function getAttributesWithCssSelector(
  query: string,
  attribute: Constant.type.content.Get,
  callback: (response: any) => void,
): void {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id!,
      {
        type: attribute,
        query: query,
      },
      callback,
    );
  });
}

export default getAttributesWithCssSelector;
