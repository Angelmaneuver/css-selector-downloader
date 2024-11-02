'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { requestDownloads } from '@/lib/chrome/downloads';
import { t } from '@/lib/chrome/i18n';
import { get, set } from '@/lib/chrome/storages';

import FilenameField from './field/FilenameField';
import IsChangeFilenameField from './field/IsChangeFilenameField';

const FormSchema = z
  .object({
    isChangeFilename: z.boolean(),
    filename: z.string(),
  })
  .refine(
    (args) => {
      const { isChangeFilename, filename } = args;

      return isChangeFilename ? filename.length > 0 : true;
    },
    {
      path: ['filename'],
      message: t('FORM_ERROR_REQUIRED_FILENAME_MESSAGE'),
    },
  );

function DownloadForm({
  tab,
  downloadlinks,
}: { tab: chrome.tabs.Tab; downloadlinks: Array<string> | undefined }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    mode: 'all',
    defaultValues: {
      isChangeFilename: false,
      filename: tab.title,
    },
    resolver: zodResolver(FormSchema),
  });

  const watcher = useWatch({ control: form.control });

  const disabled =
    downloadlinks === undefined ||
    (Array.isArray(downloadlinks) && downloadlinks.length === 0);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (Array.isArray(downloadlinks)) {
      requestDownloads(
        tab,
        downloadlinks,
        data.isChangeFilename ? data.filename : undefined,
      );

      set({ isChangeFilename: data.isChangeFilename });
    }

    window.close();
  }

  useEffect(() => {
    get<{ isChangeFilename: boolean }>(['isChangeFilename'], (items) => {
      if (items?.isChangeFilename) {
        form.setValue('isChangeFilename', items.isChangeFilename);
      }
    });
  }, []);

  useEffect(() => {
    if (Array.isArray(downloadlinks)) {
      form.setFocus(
        form.getValues().isChangeFilename ? 'filename' : 'isChangeFilename',
      );
    }
  }, [downloadlinks, form]);

  useEffect(() => {
    if (!watcher.isChangeFilename) {
      form.clearErrors('filename');
    }
  }, [watcher]);

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="rounded-none border-none">
          <CardHeader className="select-none">
            <CardTitle>
              <div className="flex items-end justify-between">
                <div>{t('TITLE_DOWNLOAD')}</div>
                {Array.isArray(downloadlinks) ? (
                  <Badge className="w-fit justify-self-end" variant="secondary">
                    {downloadlinks.length}Hits!
                  </Badge>
                ) : (
                  ''
                )}
              </div>
            </CardTitle>
            <CardDescription>{t('DESCRIPTION_DOWNLOAD')}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <IsChangeFilenameField
              form={{ name: 'isChangeFilename', control: form.control }}
              label={{ children: t('LABEL_IS_CHANGE_FILENAME') }}
              checkbox={{
                disabled: disabled,
              }}
            />

            <div className="rounded-md border p-4">
              <FilenameField
                form={{ name: 'filename', control: form.control }}
                label={{ children: t('LABEL_FILENAME') }}
                input={{
                  disabled: disabled || !watcher.isChangeFilename,
                }}
                description={{
                  children: t('DESCRIPTION_FILENAME'),
                }}
              />
            </div>
          </CardContent>
          <CardFooter className="grid gap-1">
            <Button className="w-full" type="submit" disabled={disabled}>
              {t('BUTTON_DOWNLOAD')}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}

export default DownloadForm;
