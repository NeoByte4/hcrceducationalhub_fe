/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { Controller } from "react-hook-form";
import { Check, ChevronsUpDown, X } from "lucide-react";

import FormElementsWrapper from "./form-elements-wrapper";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

interface Option {
  label: string;
  value: string;
}

interface FormSelectSearchableProps {
  name: string;
  label: string;
  options: Option[];
  control: any;
  placeholder?: string;
  rules?: any;
  required?: boolean;
  error?: string;
  disabled?: boolean;
}

const FormSelectSearchable: React.FC<FormSelectSearchableProps> = ({
  name,
  label,
  options,
  control,
  placeholder,
  rules,
  required = false,
  error,
  disabled = false,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <FormElementsWrapper
      label={label}
      name={name}
      required={required}
      error={error}
    >
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => {
          const selected = options.find((o) => o.value === field.value);

          return (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  role="combobox"
                  aria-expanded={open}
                  aria-label={label}
                  disabled={disabled}
                  className="w-full justify-between border"
                >
                  <span
                    className={cn(
                      "truncate",
                      !selected && "text-muted-foreground",
                    )}
                  >
                    {selected ? selected.label : placeholder || "Select option"}
                  </span>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 z-[1001]">
                <Command shouldFilter={true}>
                  <div className="flex items-center gap-2 px-2 pt-2">
                    <CommandInput
                      placeholder={`Search ${label.toLowerCase()}`}
                      aria-label={`Search ${label}`}
                      autoFocus
                    />
                    {field.value ? (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label="Clear selection"
                        onClick={() => {
                          field.onChange("");
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    ) : null}
                  </div>

                  <CommandList className="max-h-64">
                    <CommandEmpty>No results.</CommandEmpty>
                    <CommandGroup>
                      {options.map((opt) => (
                        <CommandItem
                          key={opt.value}
                          value={`${opt.label} ${opt.value}`}
                          onSelect={() => {
                            field.onChange(opt.value);
                            setOpen(false);
                          }}
                          aria-label={`Choose ${opt.label}`}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              field.value === opt.value
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          <span className="truncate">{opt.label}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          );
        }}
      />
    </FormElementsWrapper>
  );
};

export default FormSelectSearchable;
