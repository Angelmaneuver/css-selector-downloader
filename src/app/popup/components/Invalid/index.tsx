import { AlertCircle } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { t } from '@/lib/chrome/i18n';

function InvalidMessage() {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{t('ERROR')}</AlertTitle>
      <AlertDescription>{t('ONLY_WEBSITE_MESSAGE')}</AlertDescription>
    </Alert>
  );
}

export default InvalidMessage;
