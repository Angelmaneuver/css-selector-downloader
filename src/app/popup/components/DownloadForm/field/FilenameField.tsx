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
import { Input } from '@/components/ui/input';

type FilenameFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  form: { name: TName; control: Control<TFieldValues> };
  label?: ComponentProps<typeof FormLabel>;
  input?: ComponentProps<typeof Input>;
  description?: ComponentProps<typeof FormDescription>;
};

function FilenameField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  form,
  label,
  input,
  description,
}: FilenameFieldProps<TFieldValues, TName>) {
  return (
    <FormField
      name={form.name}
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="select-none" {...label} />
          <FormControl>
            <Input {...input} {...field} />
          </FormControl>
          <FormDescription className="select-none" {...description} />
          <FormMessage className="select-none" />
        </FormItem>
      )}
    />
  );
}

export default FilenameField;
