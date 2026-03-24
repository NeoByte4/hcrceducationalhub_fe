import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Loader, ArrowUpRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import StyledButton from "@/components/ui/styled-button";
import FormElementsWrapper from "@/components/ui/form-elements-wrapper";
import HeadingText from "@/components/ui/heading-text";
import Turnstile from "react-turnstile";
import { IIntake, IProgram } from "@/src/graphql/types_api";
import { Button } from "@/components/ui/button";
import ApplicationPreviewDialog from "../cards/booking/booking-preview-dialog";

const defaultApplicant = {
  fullName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  educationLevel: "",
  gpa: "",
};

interface IFormData {
  users: (typeof defaultApplicant)[];
  classType: string;
  occupancyType: string;
  country: string;
  date: string;
  message?: string;
  programId?: string;
  programName?: string;
  institutionId?: string;
  institutionName?: string;
  intakeId?: string;
  intakeName?: string;
  intakeStartDate?: string;
  intakeEndDate?: string;
}

export default function ApplicationFormClient({
  program,
  intake,
}: {
  program: IProgram;
  intake: IIntake;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues: {
      users: [defaultApplicant],
      message: "",
    },
  });

  const { fields } = useFieldArray({ control, name: "users" });
  const formData = watch();

  const onSubmit = async (data: IFormData) => {
    setIsSubmitting(true);

    const submissionData = {
      ...data,
      programId: program.id,
      programName: program.name,
      institutionId: program.institution?.id,
      institutionName: program.institution?.name,
      intakeId: intake.id,
      intakeName: intake.name,
      intakeStartDate: intake.start_date,
      intakeEndDate: intake.end_date,
    };

    console.log("Submitting:", submissionData);
    setIsSubmitting(false);
    setIsSuccess(true);
    setIsDialogOpen(false);
  };

  if (isSuccess) {
    return (
      <div className="text-center py-20 space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <ArrowUpRight className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold">Application Submitted!</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Thank you for applying to{" "}
          <span className="font-medium">{program.name}</span>. Our counselors
          will review your application and contact you within 2–3 business days.
        </p>
      </div>
    );
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(() => setIsDialogOpen(true))}
        className="space-y-8"
      >
        {/* Program Details — read only */}
        <section className="border rounded-lg p-4 space-y-4">
          <HeadingText level={5}>Program Details</HeadingText>
          <div className="grid md:grid-cols-2 gap-4">
            <FormElementsWrapper name="programName" label="Program Name">
              <Input
                value={program.name}
                readOnly
                className="bg-gray-100 cursor-not-allowed"
              />
            </FormElementsWrapper>
            <FormElementsWrapper
              name="institutionName"
              label="Institution Name"
            >
              <Input
                value={program.institution?.name || ""}
                readOnly
                className="bg-gray-100 cursor-not-allowed"
              />
            </FormElementsWrapper>
            <FormElementsWrapper name="intakeName" label="Intake">
              <Input
                value={intake.name}
                readOnly
                className="bg-gray-100 cursor-not-allowed"
              />
            </FormElementsWrapper>
            <FormElementsWrapper name="startDate" label="Start Date">
              <Input
                value={
                  intake.start_date
                    ? new Date(intake.start_date).toLocaleDateString()
                    : ""
                }
                readOnly
                className="bg-gray-100 cursor-not-allowed"
              />
            </FormElementsWrapper>
          </div>
        </section>

        {/* Applicant Details */}
        <section className="border rounded-lg p-4 space-y-6">
          <HeadingText level={5}>Applicant Details</HeadingText>
          {fields.map((field, index) => (
            <div key={field.id} className="grid md:grid-cols-2 gap-4">
              <FormElementsWrapper
                required
                name={`users.${index}.fullName`}
                label="Full Name"
                error={errors.users?.[index]?.fullName?.message}
              >
                <Input
                  {...register(`users.${index}.fullName`, {
                    required: "Full Name is required",
                  })}
                  placeholder="Sanjeeb Basnet"
                />
              </FormElementsWrapper>

              <FormElementsWrapper
                required
                name={`users.${index}.email`}
                label="Email"
                error={errors.users?.[index]?.email?.message}
              >
                <Input
                  type="email"
                  {...register(`users.${index}.email`, {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email",
                    },
                  })}
                  placeholder="office@hcrceducationhub.com"
                />
              </FormElementsWrapper>

              <FormElementsWrapper
                required
                name={`users.${index}.phone`}
                label="Phone"
                error={errors.users?.[index]?.phone?.message}
              >
                <Input
                  {...register(`users.${index}.phone`, {
                    required: "Phone is required",
                  })}
                  placeholder="+977 9852032790"
                />
              </FormElementsWrapper>

              <FormElementsWrapper
                name={`users.${index}.dateOfBirth`}
                label="Date of Birth"
                error={errors.users?.[index]?.dateOfBirth?.message}
              >
                <Input
                  type="date"
                  {...register(`users.${index}.dateOfBirth`, {})}
                />
              </FormElementsWrapper>

              <FormElementsWrapper
                required
                name={`users.${index}.educationLevel`}
                label="Education Level"
                error={errors.users?.[index]?.educationLevel?.message}
              >
                <Input
                  {...register(`users.${index}.educationLevel`, {
                    required: "Education Level is required",
                  })}
                  placeholder="High School / Bachelor's / Master's"
                />
              </FormElementsWrapper>

              <FormElementsWrapper
                name={`users.${index}.gpa`}
                label="GPA"
                error={errors.users?.[index]?.gpa?.message}
              >
                <Input
                  {...register(`users.${index}.gpa`, {})}
                  placeholder="4.0 / 2.5 etc."
                />
              </FormElementsWrapper>
            </div>
          ))}

          <FormElementsWrapper
            name="message"
            label="Special Requests"
            error={errors.message?.message}
          >
            <textarea
              {...register("message")}
              rows={5}
              className="w-full border border-surface-2 rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-primary-dark/25 bg-bg"
              placeholder="Any special requests or notes..."
            />
          </FormElementsWrapper>

          <Turnstile
            sitekey={process.env.NEXT_PUBLIC_CF_SITE_KEY!}
            onVerify={() => {}}
            onExpire={() => {}}
            className="mb-2"
          />

          <StyledButton
            icon={isSubmitting ? Loader : ArrowUpRight}
            iconStyle={isSubmitting ? "animate-spin" : ""}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Preview Application"}
          </StyledButton>
        </section>
      </form>

      {/* Preview Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogPortal>
          <DialogOverlay className="fixed inset-0 bg-black/80 z-[10000]" />
          <DialogContent className="z-[10001] max-w-2xl">
            <DialogHeader>
              <DialogTitle>Confirm Your Application</DialogTitle>
            </DialogHeader>

            <ApplicationPreviewDialog
              program={program}
              formData={formData}
              intakeDate={intake.start_date}
            />

            <DialogFooter className="flex justify-between gap-2">
              <Button
                variant="destructive"
                onClick={() => setIsDialogOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                onClick={() => onSubmit(formData)}
                className="bg-primary-dark"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader className="animate-spin w-4 h-4 mr-2" />
                ) : null}
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </>
  );
}
