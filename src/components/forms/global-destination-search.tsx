"use client";

import { Button } from "@/components/ui/button";
import { FormSelect } from "@/components/ui/form-select";
import FormSelectSearchable from "@/components/ui/form-select-searchable";
import { IDestination_MINIMAL } from "@/src/graphql/types_api";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormValues {
  country: string;
  institution: string;
  program: string;
}

interface Props {
  country: {
    name: IDestination_MINIMAL["name"];
    slug: IDestination_MINIMAL["slug"];
  }[];

  institution: {
    name: IDestination_MINIMAL["name"];
    slug: IDestination_MINIMAL["slug"];
  }[];

  program: {
    name: IDestination_MINIMAL["name"];
    slug: IDestination_MINIMAL["slug"];
  }[];
}

function buildQueryParams(values: FormValues) {
  const params: Record<string, string> = {};

  if (values.country) params.country = values.country;
  if (values.institution) params.institution = values.institution;
  if (values.program) params.program = values.program;

  return new URLSearchParams(params).toString();
}

const GobalDestinationSearch: React.FC<Props> = ({
  country,
  institution,
  program,
}) => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      country: "",
      institution: "",
      program: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const queryParams = buildQueryParams(data);
    router.push(`/tours?${queryParams}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-xl shadow px-6  py-5 w-full max-w-5xl mx-auto border border-[var(--color-border-first)]"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Find Your Study Program
      </h3>

      <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap items-end gap-4 md:gap-6 w-full">
        <div className="flex-1 min-w-0 w-full sm:w-auto">
          <FormSelect
            name="country"
            label="Country"
            options={country.map((c) => ({
              label: c.name,
              value: c.slug,
            }))}
            control={control}
            rules={{ required: "Please select a country" }}
            error={errors.country?.message}
            required
          />
        </div>

        <div className="flex-1 min-w-0 w-full sm:w-auto">
          <FormSelectSearchable
            name="institution"
            label="Institution"
            options={institution.map((i) => ({
              label: i.name,
              value: i.slug,
            }))}
            control={control}
            rules={{ required: "Please select an institution" }}
            error={errors.institution?.message}
            required
          />
        </div>

        <div className="flex-1 min-w-0 w-full sm:w-auto">
          <FormSelect
            name="program"
            label="Program"
            options={program.map((p) => ({
              label: p.name,
              value: p.slug,
            }))}
            control={control}
            rules={{ required: "Please select a program" }}
            error={errors.program?.message}
            required
          />
        </div>

        {/* Search Button */}
        <div className="w-full sm:w-auto sm:flex-shrink-0">
          <Button
            type="submit"
            className="w-full sm:w-auto flex items-center gap-2"
          >
            <SearchIcon size={18} />
            Search
          </Button>
        </div>
      </div>
    </form>
  );
};

export default GobalDestinationSearch;
