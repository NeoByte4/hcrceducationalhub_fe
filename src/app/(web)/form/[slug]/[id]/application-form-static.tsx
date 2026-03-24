"use client";

import ProgramCard from "@/src/components/cards/program/program-card";
import { IApplication_Form } from "./page";
import { IIntake } from "@/src/graphql/types_api";
import SpacingLayout from "@/src/components/layouts/spacing-layout";
import TwoColumnLayout from "@/src/components/layouts/two-column-layout";
import ApplicationFormClient from "@/src/components/forms/booking-form";
import NewsletterSection from "@/src/components/sections/newsletter/newsletter-section";

interface Props {
  program: IApplication_Form;
  intakeId: string;
}

const ProgramApplicationStatic = ({ program, intakeId }: Props) => {
  const intake: IIntake | undefined = program.intakes?.find(
    (i) => i.id === intakeId,
  );

  if (!intake) return <div>Intake not found</div>;

  return (
    <>
      <SpacingLayout>
        <TwoColumnLayout
          reversed={true}
          sidebar={
            <div className="space-y-6">
              <ProgramCard program={program} />
            </div>
          }
        >
          <ApplicationFormClient program={program} intake={intake} />
        </TwoColumnLayout>
      </SpacingLayout>
      <NewsletterSection />
    </>
  );
};

export default ProgramApplicationStatic;
