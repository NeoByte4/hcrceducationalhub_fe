"use client";
import React, { useState } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { ArrowUpRight, Loader } from "lucide-react";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { routes } from "@/lib/routes";
import Turnstile from "react-turnstile";
import {
  contactFormSchema,
  IContactFormSchema,
} from "@/src/schemas/contact-form-validation";
import FormElementsWrapper from "@/components/ui/form-elements-wrapper";
import { Input } from "@/components/ui/input";
import { siteDetails } from "@/src/data/sit-details";
import StyledButton from "@/components/ui/styled-button";

const defaultValues: IContactFormSchema = {
  firstName: "",
  lastName: "",
  email: "",
  message: "",
  allowSubsciption: false,
};

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tsToken, setTsToken] = useState<string | null>(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
  });

  const onSubmit = async (formData: IContactFormSchema) => {
    const toastId = toast.loading(
      "Processing request for your travel plans...",
    );
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          tsToken,
        }),
      });

      if (!response.ok) throw new Error(`Failed to submit: ${response.status}`);

      const data = await response.json();
      toast.success(
        "Your travel plans are in safe hands. We’ll be in touch shortly!",
        {
          id: toastId,
        },
      );

      reset();
      router.push(`${routes.thankYou}?msg=CONTACT_CONFIRM`);
      return data;
    } catch (err) {
      toast.error(
        "Something went wrong. Please try submitting your request again!",
        {
          id: toastId,
        },
      );

      console.error(err);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border rounded-lg p-4 flex flex-col gap-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormElementsWrapper
            required
            name="firstName"
            label="First Name"
            error={errors.firstName?.message}
          >
            <Input {...register("firstName")} placeholder="Sanjeeb" />
          </FormElementsWrapper>

          <FormElementsWrapper
            required
            name="lastName"
            label="Last Name"
            error={errors.lastName?.message}
          >
            <Input {...register("lastName")} placeholder="Basnet" />
          </FormElementsWrapper>
        </div>

        <FormElementsWrapper
          required
          name="email"
          label="Email"
          error={errors.email?.message}
        >
          <Input {...register("email")} placeholder={siteDetails.email} />
        </FormElementsWrapper>

        <FormElementsWrapper
          required
          name="message"
          label="Message"
          error={errors.message?.message}
        >
          <textarea
            id="message"
            {...register("message")}
            rows={5}
            className="border border-surface-2 rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-primary-dark/25 bg-bg"
            placeholder="Describe your study abroad plans or ask us about universities, courses, or visa guidance..."
          />
        </FormElementsWrapper>

        <label className="flex items-center cursor-pointer gap-2">
          <input type="checkbox" {...register("allowSubsciption")} />
          <span className="text-sm text-text-secondary">
            Keep me updated with travel ideas and exclusive deals
          </span>
        </label>

        <div className="">
          <Turnstile
            className="mb-2"
            sitekey={process.env.NEXT_PUBLIC_CF_SITE_KEY!}
            onVerify={setTsToken}
            onExpire={() => setTsToken(null)}
            theme="light"
          />

          <StyledButton
            iconStyle={isSubmitting ? "animate-spin" : ""}
            icon={isSubmitting ? Loader : ArrowUpRight}
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? `Submitting...` : `Let's Start Planning`}
          </StyledButton>
        </div>
      </form>
    </>
  );
};

export default ContactForm;
