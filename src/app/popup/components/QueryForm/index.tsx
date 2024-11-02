'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

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
import { t } from '@/lib/chrome/i18n';
import { get, set } from '@/lib/chrome/storages';
import { getAttributesWithCssSelector } from '@/lib/chrome/tabs';
import { isValidCssSelector } from '@/lib/dom/utils';

import AttributeField, { Attributes } from './field/AttributeField';
import QueryField from './field/QueryField';

const FormSchema = z.object({
  query: z
    .string()
    .refine(
      (query) => isValidCssSelector(query),
      t('FORM_ERROR_INVALID_QUERY_MESSAGE'),
    ),
  attribute: z.number(),
});

function QueryForm({
  setDownloadlinks,
}: {
  setDownloadlinks: Dispatch<SetStateAction<Array<string> | undefined>>;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    mode: 'all',
    defaultValues: {
      attribute: Attributes[0].value,
    },
    resolver: zodResolver(FormSchema),
  });

  const watcher = useWatch({ control: form.control });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    getAttributesWithCssSelector(data.query, data.attribute, (value) => {
      setDownloadlinks(value);

      set({
        query: data.query,
        attribute: data.attribute,
      });
    });
  }

  useEffect(() => {
    get<{ query: string; attribute: number }>(
      ['query', 'attribute'],
      (items) => {
        if (items?.query) {
          form.setValue('query', items.query);
        }

        if (items?.attribute) {
          form.setValue('attribute', items.attribute);
        }

        if (items && items.query) {
          form.handleSubmit(onSubmit)();
        }
      },
    );
  }, []);

  useEffect(() => {
    setDownloadlinks(undefined);
  }, [watcher]);

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="rounded-none border-none">
          <CardHeader className="select-none">
            <CardTitle>{t('TITLE_CSS_SELECTOR')}</CardTitle>
            <CardDescription>{t('DESCRIPTION_CSS_SELECTOR')}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <QueryField
              form={{ name: 'query', control: form.control }}
              label={{ children: t('LABEL_QUERY') }}
              area={{
                className: 'resize-none',
                placeholder: '.myclass',
                autoFocus: true,
              }}
            />

            <AttributeField
              form={{
                name: 'attribute',
                control: form.control,
                setValue: form.setValue,
              }}
              label={{ children: t('LABEL_ATTRIBUTE') }}
            />
          </CardContent>
          <CardFooter className="grid gap-1">
            <Button className="w-full" type="submit">
              {t('BUTTON_SCAN')}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}

export default QueryForm;
