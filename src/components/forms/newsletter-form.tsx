"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Loader, ArrowUpRight } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import FormElementsWrapper from "@/components/ui/form-elements-wrapper";

import StyledButton from "@/components/ui/styled-button";
import Turnstile from "react-turnstile";
import {
  INewsletterSchema,
  newsletterSchema,
} from "@/schema/newsletter-validation";
import { Input } from "@/components/ui/input";

const defaultValues = {
  email: "",
};

interface props {
  mode?: "row" | "col";
  unSubMode?: boolean;
}

const NewsletterForm = ({ mode = "row", unSubMode = false }: props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tsToken, setTsToken] = useState<string | null>(null);
  const apiRoute = unSubMode ? `/api/unsubscribe` : `/api/newsletter`;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<INewsletterSchema>({
    resolver: zodResolver(newsletterSchema),
    defaultValues,
  });

  const onSubmit = async (formData: INewsletterSchema) => {
    const toastId = toast.loading(
      "Processing subscription request. Please wait...",
    );
    setIsSubmitting(true);

    try {
      if (!tsToken)
        throw new Error("Please verify you are human before submitting.");

      const response = await fetch(apiRoute, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          tsToken,
        }),
      });

      if (!response.ok) throw new Error(`Failed to submit`);

      const data = await response.json();
      toast.success("Subscription successful.", {
        id: toastId,
      });

      reset();
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(
        err.message ??
          "We could not process your request. Please check your email and try again.",
        { id: toastId },
      );
      console.error(err);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Turnstile
        sitekey={process.env.NEXT_PUBLIC_CF_SITE_KEY!}
        onVerify={setTsToken}
        onExpire={() => setTsToken(null)}
        theme="light"
      />

      <section
        className={`flex items-center gap-4 ${mode === "col" ? "flex-col" : ""}`}
      >
        <div className="flex-1 w-full">
          <FormElementsWrapper name="email" error={errors.email?.message}>
            <Input
              {...register("email")}
              placeholder={"Enter your email address"}
            />
          </FormElementsWrapper>
        </div>

        <div
          className={`${mode === "col" ? "w-full flex items-center justify-end" : ""} `}
        >
          <StyledButton
            iconStyle={isSubmitting ? "animate-spin" : ""}
            icon={isSubmitting ? Loader : ArrowUpRight}
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? `Subscribing...` : `Subscribe Now`}
          </StyledButton>
        </div>
      </section>
    </form>
  );
};

export default NewsletterForm;
