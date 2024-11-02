'use client';

import { ComponentProps } from 'react';
import { Control, FieldPath, FieldValues } from 'react-hook-form';

import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';

type IsChangeFilenameFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  form: { name: TName; control: Control<TFieldValues> };
  label?: ComponentProps<typeof FormLabel>;
  checkbox?: ComponentProps<typeof Checkbox>;
  description?: ComponentProps<typeof FormDescription>;
};

function IsChangeFilenameField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  form,
  label,
  checkbox,
  description,
}: IsChangeFilenameFieldProps<TFieldValues, TName>) {
  return (
    <FormField
      name={form.name}
      control={form.control}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0.5">
          <FormControl>
            <Checkbox
              {...checkbox}
              {...field}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel className="select-none" {...label} />
            <FormDescription className="select-none" {...description} />
          </div>
        </FormItem>
      )}
    />
  );
}

export default IsChangeFilenameField;
