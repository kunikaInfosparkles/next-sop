"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { useState } from "react";
import { Control, FieldValues, Path } from "react-hook-form";

//
// COMMON TYPES
//
interface Option {
  label: string;
  value: string;
}

//
// 1️⃣ TEXT INPUT
//
export function FormTextInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  description,
  type = "text",
  disabled = false,
  required = false,
}: {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  description?: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
}) {
  return (
    <FormField
      control={control}
      name={name}
      rules={required ? { required: `${label || name} is required` } : {}}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}{required && " *"}</FormLabel>}
          <FormControl>
            <Input {...field} placeholder={placeholder} disabled={disabled} type={type} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

//
// 2️⃣ SELECT DROPDOWN
//
export function FormSelect<T extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder = "Select option",
  required = false,
}: {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  options: Option[];
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <FormField
      control={control}
      name={name}
      rules={required ? { required: `${label || name} is required` } : {}}
      render={({ field }) => (
        <FormItem>  
          {label && <FormLabel>{label}{required && " *"}</FormLabel>}
          <Select value={field.value} onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              {options.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}

//
// 3️⃣ CHECKBOX
//
export function FormCheckbox<T extends FieldValues>({
  control,
  name,
  label,
  required = false,
}: {
  control: Control<T>;
  name: Path<T>;
  label: string;
  required?: boolean;
}) {
  return (
    <FormField
      control={control}
      name={name}
      rules={required ? { required: `${label} is required` } : undefined}
      render={({ field }) => (
        <FormItem className="flex flex-row gap-3 items-start">
          <FormControl>
            <Checkbox checked={!!field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="space-y-1">
            <FormLabel>{label}</FormLabel>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}

//
// 4️⃣ RADIO GROUP
//
export function FormRadioGroup<T extends FieldValues>({
  control,
  name,
  label,
  options,
  required = false,
}: {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: Option[];
  required?: boolean;
}) {
  return (
    <FormField
      control={control}
      name={name}
      rules={required ? { required: `${label} is required` } : {}}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}{required && " *"}</FormLabel>
          <FormControl>
            <RadioGroup value={field.value} onValueChange={field.onChange} className="flex gap-4">
              {options.map((o) => (
                <FormItem key={o.value} className="flex items-center gap-3">
                  <FormControl>
                    <RadioGroupItem value={o.value} />
                  </FormControl>
                  <FormLabel className="font-normal">{o.label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

//
// 5️⃣ AUTOCOMPLETE (Shadcn Command)
//
export function FormAutocomplete<T extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder = "Search...",
  required = false,
}: {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  options: Option[];
  placeholder?: string;
  required?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      rules={required ? { required: `${label || name} is required` } : {}}
      render={({ field }) => {
        const selected = options.find((o) => o.value === field.value);

        return (
          <FormItem >
            {label && <FormLabel>{label}{required && " *"}</FormLabel>}

            <Popover open={open} onOpenChange={setOpen} >
              <PopoverTrigger className="w-full" asChild>
                <FormControl>
                  <button
                    type="button"
                    className={cn(
                      "w-full text-left border rounded-md px-3 py-2",
                      !selected && "text-muted-foreground"
                    )}
                  >
                    {selected ? selected.label : placeholder}
                  </button>
                </FormControl>
              </PopoverTrigger>

              <PopoverContent
                className="p-0 min-w-[var(--radix-popover-trigger-width)]"
                align="start"
              >
                <Command>
                  <CommandInput placeholder={placeholder} />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup>
                      {options.map((option) => (
                        <CommandItem
                          key={option.value}
                          onSelect={() => {
                            field.onChange(option.value);
                            setOpen(false);
                          }}
                        >
                          {option.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>

            </Popover>

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
