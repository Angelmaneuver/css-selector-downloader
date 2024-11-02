'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import { ComponentProps } from 'react';
import {
  Control,
  FieldPath,
  FieldValues,
  SetFieldValue,
} from 'react-hook-form';

import * as Constant from '@/app/constants';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/shadcn/utils';

const Attributes = [
  { label: 'Src', value: Constant.type.content.Get.Src },
  { label: 'Href', value: Constant.type.content.Get.Href },
] as const;

type AttributeFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  form: {
    name: TName;
    control: Control<TFieldValues>;
    setValue: SetFieldValue<TFieldValues>;
  };
  label?: ComponentProps<typeof FormLabel>;
  description?: ComponentProps<typeof FormDescription>;
};

function AttributeField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ form, label, description }: AttributeFieldProps<TFieldValues, TName>) {
  return (
    <FormField
      name={form.name}
      control={form.control}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel {...label} />
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    'justify-between',
                    !field.value && 'text-muted-foreground',
                  )}
                >
                  {field.value !== undefined
                    ? Attributes.find(
                        (attribute) => attribute.value === field.value,
                      )?.label
                    : 'Select language'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command>
                <CommandInput placeholder="Search language..." />
                <CommandList>
                  <CommandEmpty>No language found.</CommandEmpty>
                  <CommandGroup>
                    {Attributes.map((attribute) => (
                      <CommandItem
                        value={attribute.label}
                        key={attribute.value}
                        onSelect={() => {
                          form.setValue(form.name, attribute.value);
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            attribute.value === field.value
                              ? 'opacity-100'
                              : 'opacity-0',
                          )}
                        />
                        {attribute.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>{' '}
          <FormDescription {...description} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default AttributeField;

export { Attributes };
