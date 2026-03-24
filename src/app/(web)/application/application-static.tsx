"use client";
import { Button } from "@/components/ui/button";
import SubHeadingText from "@/components/ui/sub-heading-text";
import { Timeline } from "@/components/ui/timeline";
import { routes } from "@/lib/routes";
import TitleContentBlock from "@/src/components/contents/title-content-block";
import ContainerLayout from "@/src/components/layouts/container-layout";
import SpacingLayout from "@/src/components/layouts/spacing-layout";
import TwoColumnLayout from "@/src/components/layouts/two-column-layout";
import ErrorTextSection from "@/src/components/notifiers/error-text-section";
import ContentSection from "@/src/components/sections/contents/content-section";
import InclusionsExclusionsSection from "@/src/components/sections/counseling/counseling-exclusions-section";
import HeroSection from "@/src/components/sections/hero-section";
import NewsletterSection from "@/src/components/sections/newsletter/newsletter-section";
import GenericTable from "@/src/components/sections/packages/GenericTable";
import SidebarContactForm from "@/src/components/sidebar/sidebar-contact-form";
import {
  IApplication_Step,
  IApplicationPage,
  ICountry,
  IInstitution,
  IIntake,
} from "@/src/graphql/types_api";
import { getAssetUrl } from "@/src/utils/getAssetUrl";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface props {
  name: IApplicationPage["name"];
  subtitle: IApplicationPage["subtitle"];
  overview: IApplicationPage["overview"];
  what_we_offer: IApplicationPage["what_we_offer"];
  application_step: IApplication_Step[];
  requirement_document: IApplicationPage["requirement_document"];
  why_choose_us: IApplicationPage["why_choose_us"];
  images: IApplicationPage["images"];
  institutions: IInstitution[];
  countries: ICountry[];
  country: ICountry;
  intakes: IIntake[];
}

export default function ApplicationPageStatic({
  name,
  subtitle,
  overview,
  what_we_offer,
  application_step,
  requirement_document,
  why_choose_us,
  images,
  institutions,
  countries,
  country,
  intakes,
}: props) {
  const hasImages = images && images.length > 0;
  const imageUrls = images?.map((img) =>
    typeof img.directus_files_id === "object"
      ? getAssetUrl(img.directus_files_id)
      : img.directus_files_id,
  );

  return (
    <>
      <HeroSection
        height="medium"
        description={subtitle}
        title={name}
        slideshowImages={images}
      >
        <section className="absolute z-50 w-full h-20 bottom-0 bg-black/30 backdrop-blur-sm rounded-lg overflow-hidden">
          <div className="h-full flex items-center justify-start">
            <div className="flex-1 h-full gap-2 flex flex-wrap items-center justify-center md:justify-start p-2">
              <span className="font-medium text-base h-full px-6 py-4 rounded-lg flex items-center justify-center text-white gap-2 transition-all bg-white/20 text-white">
                Overview
              </span>
            </div>
            <div className="hidden lg:flex gap-4 items-center px-6 justify-center">
              <Link href={routes.contact}>
                <Button size={"lg"} className="text-base ">
                  Apply Form
                  <ArrowUpRight />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </HeroSection>
      <SpacingLayout>
        <TwoColumnLayout className="mt-10" sidebar={<SidebarContactForm />}>
          <ContentSection
            title="Counseling Overview"
            text={name}
            htmlContent={overview}
          />
          {what_we_offer && what_we_offer.length > 0 && (
            <>
              <SubHeadingText className="mb-4">What we offer</SubHeadingText>
              <ul className="list-disc">
                {what_we_offer.map((target, index) => (
                  <li key={index}>{target}</li>
                ))}
              </ul>
            </>
          )}
        </TwoColumnLayout>
      </SpacingLayout>
      <TwoColumnLayout
        sidebar={
          <div className="flex flex-row gap-3 overflow-x-auto pb-2 md:flex-col md:overflow-x-visible md:space-y-4 scrollbar-hide">
            {countries.map((country) => {
              const firstImage = country.images?.[0]?.directus_files_id;
              const imgUrl = firstImage ? getAssetUrl(firstImage) : null;

              return (
                <Link
                  key={country.slug}
                  href={`${routes.country}/${country.slug}`}
                  className="flex-shrink-0 w-40 md:w-full relative group rounded-lg overflow-hidden"
                >
                  {imgUrl && (
                    <Image
                      src={imgUrl.src}
                      alt={imgUrl.alt ?? country.name}
                      width={400}
                      height={200}
                      className="w-full h-32 md:h-40 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/30 rounded-lg" />
                  <p className="absolute bottom-2 left-3 text-white font-semibold text-sm">
                    {country.name.trim()}
                  </p>
                </Link>
              );
            })}
          </div>
        }
        reversed={true}
      >
        <div className="md:max-w-3xl mb-8">
          <TitleContentBlock
            name="Application Steps"
            overview="A step-by-step process to guide you through your study abroad journey, from initial discussion to flying abroad."
          />
        </div>

        {application_step ? (
          <>
            <Timeline
              items={application_step.map((step) => ({
                title: step.title ?? "",
                description: step.overview ?? "",
              }))}
            />
          </>
        ) : (
          <ErrorTextSection item="Steps" parent="counseling" />
        )}
      </TwoColumnLayout>
      {requirement_document && why_choose_us && (
        <InclusionsExclusionsSection
          inclusions={requirement_document}
          exclusions={why_choose_us}
        />
      )}
      <ContainerLayout>
        {intakes && intakes.length > 0 && (
          <div className="mt-6">
            <GenericTable
              title="Intakes"
              overview={`Check all upcoming intakes at the ${name} program`}
              data={intakes}
              columns={[
                { key: "name", title: "Intake Name" },
                {
                  key: "start_date",
                  title: "Start Date",
                  render: (item: IIntake) =>
                    item.start_date
                      ? new Date(item.start_date).toLocaleDateString()
                      : "-",
                },
                {
                  key: "end_date",
                  title: "End Date",
                  render: (item) =>
                    item.end_date
                      ? new Date(item.end_date).toLocaleDateString()
                      : "-",
                },
                { key: "seats_available", title: "Seats Available" },
              ]}
              button={{
                label: "Apply Now",
                onClick: (item) =>
                  (window.location.href = `/apply/${item.name}`),
              }}
            />
          </div>
        )}
      </ContainerLayout>
      <NewsletterSection />
    </>
  );
}
