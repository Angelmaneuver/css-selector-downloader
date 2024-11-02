'use client';

import { useState } from 'react';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { getActiveTab } from '@/lib/chrome/tabs';

import DownloadForm from './DownloadForm';
import InvalidMessage from './Invalid';
import QueryForm from './QueryForm';

let tab: chrome.tabs.Tab | undefined;

function Components() {
  if (tab === undefined) {
    throw new Promise<void>((resolve, _reject) =>
      getActiveTab((activeTab) => {
        tab = activeTab;
        resolve();
      }),
    );
  }

  const [downloadlinks, setDownloadlinks] = useState<
    Array<string> | undefined
  >();

  return isValidUrl((tab.url ??= '')) ? (
    <ResizablePanelGroup className="rounded-lg border" direction="horizontal">
      <ResizablePanel defaultSize={50}>
        <QueryForm setDownloadlinks={setDownloadlinks} />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <DownloadForm tab={tab} downloadlinks={downloadlinks} />
      </ResizablePanel>
    </ResizablePanelGroup>
  ) : (
    <InvalidMessage />
  );
}

function isValidUrl(url: string): boolean {
  return url.startsWith('https://') || url.startsWith('http://');
}

export default Components;
