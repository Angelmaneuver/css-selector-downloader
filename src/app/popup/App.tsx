import { Suspense } from 'react';

import { Spinner } from '@/components/ui/spinner';

import Components from './components';

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Components />
    </Suspense>
  );
}

export default App;
