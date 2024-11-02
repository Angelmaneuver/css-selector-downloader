'use client';

import { ComponentProps } from 'react';
import { Control, FieldPath, FieldValues } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

type QueryFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  form: { name: TName; control: Control<TFieldValues> };
  label?: ComponentProps<typeof FormLabel>;
  area?: ComponentProps<typeof Textarea>;
  description?: ComponentProps<typeof FormDescription>;
};

function QueryField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ form, label, area, description }: QueryFieldProps<TFieldValues, TName>) {
  return (
    <FormField
      name={form.name}
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="select-none" {...label} />
          <FormControl>
            <Textarea {...area} {...field} />
          </FormControl>
          <FormDescription className="select-none" {...description} />
          <FormMessage className="select-none" />
        </FormItem>
      )}
    />
  );
}

export default QueryField;
