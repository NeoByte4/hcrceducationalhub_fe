import StyledButton from "@/components/ui/styled-button";
import { routes } from "@/lib/routes";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ContainerLayout from "../../layouts/container-layout";
import TitleContentBlock from "../../contents/title-content-block";

interface props {
  subtitle?: string;
  name: string;
  image: string;
  overview?: string | React.ReactNode;
}

const AboutSection: React.FC<props> = ({ subtitle, name, overview, image }) => {
  return (
    <ContainerLayout className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center my-80 sm:my-16">
      <div className="rounded-xl overflow-hidden order-2 md:order-1">
        <Image
          alt="About Prestige"
          src={image}
          className="w-full h-full object-cover"
          width={500}
          height={500}
        />
      </div>

      <div className="order-1 md:order-2">
        <TitleContentBlock
          subtitle={subtitle}
          name={name}
          overview={overview}
        />

        <Link className="block mt-10" href={routes.about}>
          <StyledButton>Discover Prestige</StyledButton>
        </Link>
      </div>
    </ContainerLayout>
  );
};

export default AboutSection;
