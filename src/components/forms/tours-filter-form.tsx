"use client";
import React, { useEffect, useMemo } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Filter, ListFilterPlus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormSelect } from "@/components/ui/form-select";

import Link from "next/link";
import { ICountry, IProgram } from "@/src/graphql/types_api";
import FormSelectSearchable from "@/components/ui/form-select-searchable";

interface FormValues {
  destination: string;
  activity: string;
  duration: string;
  price: string;
  location: string;
}

interface Props {
  redirectRoute: string;
  destinations?: {
    title: ICountry["name"];
    slug: ICountry["slug"];
  }[];
  extraParams?: Record<string, string>;
  categories: IProgram["category"][];
  searchParams: Record<string, string | undefined>;
}

function buildQueryParams(
  values?: FormValues,
  extraParams?: Record<string, string>,
) {
  const params: Record<string, string> = {};

  if (values?.destination) params.destination = values.destination;
  if (values?.activity) params.activity = values.activity;

  if (values?.duration) {
    const [minDays, maxDays] = values.duration.split("-").map((n) => n.trim());
    if (minDays) params.minDays = minDays;
    if (maxDays) params.maxDays = maxDays;
  }

  if (values?.location) params.location = values.location;

  if (values?.price) {
    const [minPrice, maxPrice] = values.price
      .split("-")
      .map((n) => n.replace(/\$/g, "").trim());
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;
  }

  const merged = { ...params, ...(extraParams ?? {}) };

  return new URLSearchParams(merged).toString();
}

const ToursFilterForm: React.FC<Props> = ({
  redirectRoute,
  destinations,
  categories,
  extraParams,
  searchParams,
}) => {
  const router = useRouter();

  const defaultValues = useMemo<FormValues>(() => {
    const destination = searchParams?.destination || "";
    const activity = searchParams?.activity || "";
    const location = searchParams?.location || "";

    const minDays = searchParams?.minDays;
    const maxDays = searchParams?.maxDays;
    const duration = minDays && maxDays ? `${minDays}-${maxDays}` : "";

    const minPrice = searchParams?.minPrice;
    const maxPrice = searchParams?.maxPrice;
    const price = minPrice && maxPrice ? `${minPrice}-${maxPrice}` : "";
    return { destination, activity, duration, price, location };
  }, [searchParams]);

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const queryString = buildQueryParams(data, extraParams);
    router.push(`${redirectRoute}?${queryString}#results`);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">
          <Filter size={16} className="mr-2" />
          Filters
        </Button>
      </PopoverTrigger>

      <PopoverPortal>
        <PopoverContent
          align="end"
          className="bg-white border p-4 mt-2 rounded-lg w-72 shadow-md z-[1000]"
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {destinations && destinations.length > 0 && (
              <FormSelect
                name="destination"
                label="Destination"
                options={destinations.map((el) => ({
                  label: el.title,
                  value: el.slug,
                }))}
                control={control}
                placeholder="Select Destination"
              />
            )}

            <div className="grid grid-cols-3 gap-2">
              <Button type="submit" className="col-span-2">
                <ListFilterPlus size={16} /> Apply
              </Button>

              <Link
                href={`${redirectRoute}?${buildQueryParams(undefined, extraParams)}#results`}
              >
                <Button type="reset" variant="destructive" className="w-full">
                  <Trash2 size={16} /> Clear
                </Button>
              </Link>
            </div>
          </form>
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  );
};

export default ToursFilterForm;
