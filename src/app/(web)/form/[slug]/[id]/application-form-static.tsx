"use client";
import React, { useState } from "react";

import ProgramCard from "@/src/components/cards/program/program-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Info } from "lucide-react";

import { routes } from "@/lib/routes";
import { IApplication_Form } from "./page";
import { IIntake } from "@/src/graphql/types_api";
import SpacingLayout from "@/src/components/layouts/spacing-layout";
import TwoColumnLayout from "@/src/components/layouts/two-column-layout";
import ApplicationFormClient from "@/src/components/forms/booking-form";

interface Props {
  program: IApplication_Form;
  intakeId: string;
}

const ProgramApplicationStatic = ({ program, intakeId }: Props) => {
  const [price, setPrice] = useState<number | null>(null);

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
              <div className="flex items-center w-full gap-4 mt-6">
                <Link className="flex-1 " href={`${routes.program}`}>
                  <Button className="w-full ">
                    <Info />
                    See Details
                  </Button>
                </Link>

                <div className="flex-1"></div>
              </div>
            </div>
          }
        >
          <ApplicationFormClient program={program} intake={intake} />
        </TwoColumnLayout>
      </SpacingLayout>
    </>
  );
};

export default ProgramApplicationStatic;
