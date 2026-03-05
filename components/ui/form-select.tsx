/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { SelectPortal } from "@radix-ui/react-select";
import FormElementsWrapper from "./form-elements-wrapper";

interface Option {
  label: string;
  value: string;
}

interface FormSelectProps {
  name: string;
  label: string;
  options: Option[];
  control: any;
  placeholder?: string;
  rules?: any;
  required?: boolean;
  error?: string;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  name,
  label,
  options,
  control,
  placeholder,
  rules,
  required = false,
  error,
}) => {
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
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger aria-label={label} className="w-full">
              <SelectValue
                aria-label={label}
                placeholder={placeholder || "Select option"}
              />
            </SelectTrigger>
            <SelectPortal>
              <SelectContent className="z-[1001] max-h-64">
                {options.map((opt, i) => (
                  <SelectItem
                    aria-label={`Choose ${opt.value}`}
                    key={`${opt.value}-${i}`}
                    value={opt.value}
                  >
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectPortal>
          </Select>
        )}
      />
    </FormElementsWrapper>
  );
};
