"use client";

import React, { JSX, useRef, useState } from "react";
import { IInstitution, IIntake } from "@/src/graphql/types_api";

import TitleContentBlock from "@/src/components/contents/title-content-block";
import { shouldRenderSection } from "@/src/utils/should-render-section";
import SubHeadingText from "@/components/ui/sub-heading-text";
import { getAssetUrl } from "@/src/utils/getAssetUrl";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import FaqSection from "@/src/components/sections/question/faq-section";
import KeywordSearch from "@/src/components/forms/keyword-search";
import ToursFilterForm from "@/src/components/forms/tours-filter-form";
import { routes } from "@/lib/routes";
import HeroSection from "@/src/components/sections/hero-section";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Share2 } from "lucide-react";
import SpacingLayout from "@/src/components/layouts/spacing-layout";
import TwoColumnLayout from "@/src/components/layouts/two-column-layout";
import SidebarContactForm from "@/src/components/sidebar/sidebar-contact-form";
import NewsletterSection from "@/src/components/sections/newsletter/newsletter-section";
import GenericTable from "@/src/components/sections/packages/GenericTable";
import ProgramCard from "@/src/components/cards/program/program-card";
import ErrorTextSection from "@/src/components/notifiers/error-text-section";
import { useRouter } from "next/navigation";
import { siteDetails } from "@/src/data/sit-details";
import CopyToClipboard from "@/src/components/utils/copy-to-clipboard";
import { newsShareLinks } from "@/src/data/newsShareLinks";

interface Props {
  tab: string;
  id: IInstitution["id"];
  name: IInstitution["name"];
  slug: IInstitution["slug"];
  subtitle: IInstitution["subtitle"];
  overview: IInstitution["overview"];
  location: IInstitution["location"];
  latitude: IInstitution["latitude"];
  longitude: IInstitution["longitude"];
  global_ranking: IInstitution["global_ranking"];
  national_ranking: IInstitution["national_ranking"];
  established_date: IInstitution["established_date"];
  logo: IInstitution["logo"];
  video?: IInstitution["video"];
  images?: IInstitution["images"];
  country: IInstitution["country"];
  information_video: IInstitution["information_video"];
  program: IInstitution["program"];
  intakes: IInstitution["intakes"];
  fees_structure: IInstitution["fees_structure"];
  information_document: IInstitution["information_document"];
  admission_requirement_data: IInstitution["admission_requirement_data"];
  faq: IInstitution["faq"];
}

const tabs = [
  { key: "overview", title: "Overview" },
  { key: "programs", title: "Programs" },
];

export default function UniversityStatic({
  tab,
  name,
  slug,
  subtitle,
  overview,
  location,
  established_date,
  national_ranking,
  global_ranking,
  logo,
  video,
  images,
  intakes,
  faq,
  admission_requirement_data,
  information_document,
  information_video,
  program,
}: Props): JSX.Element {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeTab, setActiveTab] = useState(
    tabs.some((t) => t.key === tab) ? tab : "overview",
  );
  const router = useRouter();
  const currentUrl = `${siteDetails.SITE_URL}${routes.university}/${slug}`;
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
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {location && (
              <div className="p-4 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                  Location
                </p>
                <p className="text-gray-800 font-medium">{location}</p>
              </div>
            )}
            {established_date && (
              <div className="p-4 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                  Established
                </p>
                <p className="text-gray-800 font-medium">{established_date}</p>
              </div>
            )}
            {national_ranking && (
              <div className="p-4 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                  National Ranking
                </p>
                <p className="text-gray-800 font-medium">#{national_ranking}</p>
              </div>
            )}
          </div>

          {intakes && intakes.length > 0 && (
            <div className="mt-8">
              <GenericTable
                title="Intakes"
                overview={`Check all upcoming intakes at the ${name} university and their availability.`}
                data={intakes}
                columns={[
                  {
                    key: "program",
                    title: "Program",
                    render: (item: IIntake) => item.program?.name || "N/A",
                  },
                  { key: "name", title: "Intake Name" },
                  {
                    key: "start_date",
                    title: "Start Date",
                    render: (item: IIntake) =>
                      item.start_date
                        ? new Date(item.start_date).toLocaleDateString()
                        : "-",
                  },
                  { key: "seats_available", title: "Seats Available" },
                  {
                    key: "end_date",
                    title: "End Date",
                    render: (item: IIntake) =>
                      item.end_date
                        ? new Date(item.end_date).toLocaleDateString()
                        : "-",
                  },
                ]}
                button={{
                  label: "Apply Now",
                  onClick: (item: IIntake) => {
                    const programSlug = item.program?.slug;
                    if (programSlug && item.id) {
                      router.push(`${routes.form}/${programSlug}/${item.id}`);
                    }
                  },
                  variant: "secondary",
                  size: "sm",
                  disabled: (item) =>
                    item.end_date ? new Date(item.end_date) < new Date() : true,
                }}
              />
            </div>
          )}

          {admission_requirement_data && (
            <div className="mt-6">
              <SubHeadingText>Requirements</SubHeadingText>
              {admission_requirement_data.map((req, idx) => (
                <div key={idx} className="mt-4 p-4 rounded-lg">
                  <p className="font-semibold mb-2 text-gray-800 border-b-2 border-primary inline-block ">
                    Admission requirement data
                  </p>

                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    {req.academic_level && (
                      <li>
                        <span className="font-semibold">Academic level :</span>{" "}
                        {req.academic_level}
                      </li>
                    )}
                    {req.gpa && (
                      <li>
                        <span className="font-semibold">Major subject :</span>{" "}
                        {req.major_subject}
                      </li>
                    )}
                    {req.ielts && (
                      <li>
                        <span className="font-semibold">Ielts :</span>{" "}
                        {req.ielts}
                      </li>
                    )}
                    {req.toefl && (
                      <li>
                        <span className="font-semibold">Toefl :</span>{" "}
                        {req.toefl}
                      </li>
                    )}
                    {req.pte && (
                      <li>
                        <span className="font-semibold">Pte :</span> {req.pte}
                      </li>
                    )}
                    {req.note && (
                      <li>
                        <span className="font-semibold">Note:</span> {req.note}
                      </li>
                    )}
                  </ul>
                  {information_document && information_document.length > 0 && (
                    <div className="mt-3">
                      <p className="font-semibold mb-2 text-gray-800 border-b-2 border-primary inline-block">
                        Documents:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        {information_document.map((doc, idx) => (
                          <li key={idx}>
                            <span className="font-semibold">{doc.name}</span>
                            {doc.file && (
                              <>
                                {" - "}
                                <a
                                  href={`/api/files/${doc.file.id}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 underline"
                                >
                                  {doc.file.filename_download || "Download"}
                                </a>
                              </>
                            )}
                            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                              {doc?.description}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ----- Information Videos ----- */}
          {information_video && information_video.length > 0 && (
            <div className="mt-6">
              <SubHeadingText>Information Videos</SubHeadingText>
              <Carousel
                className="w-full mt-4"
                opts={{ align: "start", loop: true }}
              >
                <CarouselContent>
                  {information_video.map((videoItem, index) => (
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
                            src={getAssetUrl(videoItem.directus_files_id).src}
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

    if (activeTab === "programs")
      return (
        <>
          <TitleContentBlock name={`Programs in ${name}`} />
          <div className="flex flex-col lg:flex-row lg:items-center gap-2 justify-between mb-6">
            <div className="md:max-w-xl flex items-center gap-2">
              <KeywordSearch
                redirectRoute={`${routes.program}/${slug}`}
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
          {program ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-4">
              {program &&
                program.length > 0 &&
                program.map((programItem) => (
                  <div
                    key={programItem.slug}
                    className="last:hidden xl:last:block"
                  >
                    <ProgramCard
                      program={programItem}
                      institution_name={name}
                      logo={logo}
                      location={location}
                    />
                  </div>
                ))}
            </div>
          ) : (
            <ErrorTextSection item="program" parent="university" />
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
        logo={logo}
        global_ranking={global_ranking?.toString()}
      >
        <section className="absolute z-50 w-full md:h-20 bottom-0 bg-black/30 backdrop-blur-sm rounded-lg flex items-center justify-center overflow-hidden">
          <div className="flex-1 h-full gap-2 flex flex-wrap items-center justify-center md:justify-start p-2">
            {renderTabs()}
          </div>

          <div className="hidden lg:flex gap-4 items-center px-6 justify-center">
            {newsShareLinks.map((social) => (
              <Link
                key={social.name}
                href={social.getUrl(currentUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white transition-all"
              >
                <social.icon size={18} />
              </Link>
            ))}

            <CopyToClipboard text={currentUrl}>
              <p className="text-white transition-all cursor-pointer">
                <Share2 size={18} />
              </p>
            </CopyToClipboard>
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
