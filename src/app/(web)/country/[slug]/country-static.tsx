"use client";
import {
  ICountry,
  IProgram,
  IRequirement_document,
  IRequirements_data,
} from "@/src/graphql/types_api";
import React, { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { Button } from "@/components/ui/button";
import TitleContentBlock from "@/src/components/contents/title-content-block";
import KeywordSearch from "@/src/components/forms/keyword-search";
import ToursFilterForm from "@/src/components/forms/tours-filter-form";
import { shouldRenderSection } from "@/src/utils/should-render-section";
import ErrorTextSection from "@/src/components/notifiers/error-text-section";
import HeroSection from "@/src/components/sections/hero-section";
import SpacingLayout from "@/src/components/layouts/spacing-layout";
import TwoColumnLayout from "@/src/components/layouts/two-column-layout";
import SidebarContactForm from "@/src/components/sidebar/sidebar-contact-form";
import NewsletterSection from "@/src/components/sections/newsletter/newsletter-section";
import UniversityCard from "@/src/components/cards/university/university-card";
import SubHeadingText from "@/components/ui/sub-heading-text";
import RichTextSection from "@/components/ui/rich_text_paragraph";
import { getAssetUrl } from "@/src/utils/getAssetUrl";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import FaqSection from "@/src/components/sections/question/faq-section";

interface props {
  tab: string;
  name: ICountry["name"];
  subtitle: ICountry["subtitle"];
  overview: ICountry["overview"];
  working_right: ICountry["working_right"];
  language: ICountry["language"];
  post_study_work_visa: ICountry["post_study_work_visa"];
  flag: ICountry["flag"];
  video: ICountry["video"];
  images: ICountry["images"];
  institutions: ICountry["institutions"];
  information_video: ICountry["information_video"];
  faq: ICountry["faq"];
  locations: Array<{
    title: string;
    value: string;
  }>;
  slug: ICountry["slug"];
  data: {
    tours?: IProgram[];
  };
  requirements_data: ICountry["requirements_data"];
  information_document: ICountry["information_document"];
}

const tabs = [
  { key: "overview", title: "Overview" },
  { key: "UniversityUniversityUniversity", title: "University" },
];

export default function CountryStatic({
  tab,
  name,
  faq,
  overview,
  slug,
  subtitle,
  working_right,
  language,
  post_study_work_visa,
  video,
  images,
  institutions,
  requirements_data,
  information_video,
}: props) {
  console.log(faq);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeTab, setActiveTab] = useState(
    tabs.some((t) => t.key === tab) ? tab : "overview",
  );
  const renderTabs = () =>
    tabs.map(({ key, title }) => (
      <button
        key={key}
        onClick={() => setActiveTab(key)}
        className={`font-medium text-base h-full px-6 py-4 rounded-lg flex items-center justify-center text-white gap-2 transition-all ${
          activeTab === key
            ? "bg-white/20 text-white"
            : "hover:bg-white/10 hover:text-white"
        }`}
      >
        {title}
      </button>
    ));

  const renderContent = () => {
    if (activeTab === "overview")
      return (
        <>
          <TitleContentBlock name="Overview" overview={overview} />
          <RichTextSection title="Working Rights" content={working_right} />
          <RichTextSection title="Language" content={language} />
          <RichTextSection
            title="Post Study Work Visa"
            content={post_study_work_visa}
          />

          {requirements_data && (
            <div className="mt-6">
              <SubHeadingText>Requirements</SubHeadingText>
              {requirements_data.map((req: IRequirements_data, idx: number) => (
                <div key={idx} className="mt-4 p-4 rounded-lg">
                  {req.name && (
                    <p className="font-semibold mb-2 text-gray-800 border-b-2 border-primary inline-block ">
                      {req.name}
                    </p>
                  )}
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    {req.processing_time && (
                      <li>
                        <span className="font-semibold">Processing Time :</span>{" "}
                        {req.processing_time}
                      </li>
                    )}

                    {req.visa_fee && (
                      <li>
                        <span className="font-semibold">Visa Fee :</span>{" "}
                        {req.visa_fee}
                      </li>
                    )}

                    {req.biometrics && (
                      <li>
                        <span className="font-semibold">Biometrics :</span>{" "}
                        {req.biometrics}
                      </li>
                    )}

                    {req.interview && (
                      <li>
                        <span className="font-semibold">Interview :</span>{" "}
                        {req.interview}
                      </li>
                    )}

                    {req.health_insurance && (
                      <li>
                        <span className="font-semibold">
                          Health Insurance :
                        </span>{" "}
                        {req.health_insurance}
                      </li>
                    )}

                    {req.dependents_allowed && (
                      <li>
                        <span className="font-semibold">
                          Dependents Allowed :
                        </span>{" "}
                        {req.dependents_allowed}
                      </li>
                    )}

                    {req.notes && (
                      <li>
                        <span className="font-semibold">Notes : </span>{" "}
                        {req.notes}
                      </li>
                    )}
                  </ul>

                  {req.requirement_document &&
                    req.requirement_document.length > 0 && (
                      <div className="mt-3">
                        <p className="font-semibold mb-2 text-gray-800 border-b-2 border-primary inline-block ">
                          Documents:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-gray-700">
                          {req.requirement_document.map(
                            (doc: IRequirement_document, i: number) => (
                              <li key={i}>
                                <span className="font-semibold">
                                  {doc.name}
                                </span>

                                {doc.document && (
                                  <>
                                    {" "}
                                    -{" "}
                                    <a
                                      href={`/api/files/${doc.document.directus_files_id}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 underline"
                                    >
                                      {doc.document.filename_download}
                                    </a>
                                  </>
                                )}
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    )}
                </div>
              ))}
            </div>
          )}

          {information_video && information_video.length > 0 && (
            <div className="mt-6">
              <SubHeadingText>Information Videos</SubHeadingText>
              <Carousel
                className="w-full mt-4"
                opts={{ align: "start", loop: true }}
              >
                <CarouselContent>
                  {information_video.map((videoFile, index) => (
                    <CarouselItem key={index} className="basis-full">
                      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black">
                        <video
                          ref={(el) => {
                            if (!el || videoRefs.current[index] === el) return;
                            videoRefs.current[index] = el;
                            const observer = new IntersectionObserver(
                              ([entry]) => {
                                if (!entry.isIntersecting) el.pause();
                              },
                              { threshold: 0.5 },
                            );
                            observer.observe(el);
                          }}
                          className="w-full h-full object-cover"
                          controls
                          preload="metadata"
                          muted
                          onPlay={(e) => {
                            e.currentTarget.muted = false;
                            e.currentTarget.volume = 0.3;
                          }}
                        >
                          <source
                            src={getAssetUrl(videoFile.directus_files_id).src}
                            type="video/mp4"
                          />
                        </video>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
            </div>
          )}
        </>
      );

    if (activeTab === "UniversityUniversityUniversity")
      return (
        <>
          <TitleContentBlock name={`Universities in ${name}`} />
          <div className="flex flex-col lg:flex-row lg:items-center gap-2 justify-between mb-6">
            <div className="md:max-w-xl flex items-center gap-2">
              <KeywordSearch
                redirectRoute={`${routes.country}/${slug}`}
                extraParams={{ tab: "tours" }}
              />
            </div>
            <div className="relative z-100">
              <ToursFilterForm
                redirectRoute={routes.program}
                destinations={[]}
                categories={[]}
                searchParams={{}}
              />
            </div>
          </div>
          {shouldRenderSection(institutions) ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-4">
              {institutions?.map((institution) => (
                <UniversityCard
                  key={institution.slug}
                  image={institution.images || []}
                  name={institution.name}
                  subtitle={institution.subtitle || ""}
                  global_ranking={institution.global_ranking?.toString() || ""}
                  rating="4.5"
                  slug={institution.slug}
                  location={institution.location || ""}
                  established_date={institution.established_date || ""}
                  logo={institution.logo || null}
                  video={institution.video || null}
                />
              ))}
            </div>
          ) : (
            <ErrorTextSection item="Universities" parent="Country" />
          )}
        </>
      );

    return null;
  };

  return (
    <>
      <HeroSection
        height="large"
        image={images?.[0]?.directus_files_id}
        video={video}
        description={subtitle}
        title={name}
      >
        <section className="absolute z-50 w-full md:h-20 bottom-0 bg-black/30 backdrop-blur-sm rounded-lg flex items-center justify-center overflow-hidden">
          <div id="results" />
          <div className="flex-1 h-full gap-2 flex flex-wrap items-center justify-center md:justify-start p-2">
            {renderTabs()}
          </div>

          <div className="hidden lg:flex gap-4 items-center px-6 justify-center">
            <Link href={routes.contact}>
              <Button size="lg">
                Contact us
                <ArrowUpRight />
              </Button>
            </Link>
          </div>
        </section>
      </HeroSection>

      <SpacingLayout className="mt-10">
        <TwoColumnLayout sidebar={<SidebarContactForm />}>
          {renderContent()}
        </TwoColumnLayout>
        {shouldRenderSection(faq) && <FaqSection data={faq} name={name} />}
        <NewsletterSection />
      </SpacingLayout>
    </>
  );
}
