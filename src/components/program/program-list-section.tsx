import { IProgram } from "@/src/graphql/types_api";
import React from "react";
import ContainerLayout from "../layouts/container-layout";

import Link from "next/link";
import ProgramCard from "../cards/program/program-card";
import StyledButton from "@/components/ui/styled-button";
import TitleContentBlock from "../contents/title-content-block";

interface Props {
  name: string;
  subtitle?: string;
  description?: string;
  data: IProgram[];
  morePlansUrl?: string;
  morePlansLabel?: string;
}

const ProgramListSection: React.FC<Props> = ({
  name,
  subtitle,
  description,
  data,
  morePlansUrl,
  morePlansLabel = "See More Programs",
}) => {
  if (!data || data.length === 0) return null;

  return (
    <section className="my-80 sm:my-16">
      <ContainerLayout>
        <TitleContentBlock
          name={name}
          subtitle={subtitle}
          overview={description}
          isCenter={true}
        />
      </ContainerLayout>
      <ContainerLayout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-4 mt-6 gap-y-10">
        {data.map((program) => (
          <div key={program.slug} className="last:hidden xl:last:block">
            <ProgramCard key={program.slug} program={program} />
          </div>
        ))}
      </ContainerLayout>
      <ContainerLayout className="grid place-items-center mt-12">
        {morePlansUrl && (
          <Link href={morePlansUrl}>
            <StyledButton>{morePlansLabel}</StyledButton>
          </Link>
        )}
      </ContainerLayout>
    </section>
  );
};

export default ProgramListSection;
