"use client";

import React, { JSX, useRef, useState } from "react";
import { IProgram, IIntake, IFeesStructure } from "@/src/graphql/types_api";

import TitleContentBlock from "@/src/components/contents/title-content-block";
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
import GenericTable from "@/src/components/sections/packages/GenericTable";
import HeroSection from "@/src/components/sections/hero-section";
import { Share2 } from "lucide-react";
import Link from "next/link";
import SpacingLayout from "@/src/components/layouts/spacing-layout";
import TwoColumnLayout from "@/src/components/layouts/two-column-layout";
import SidebarContactForm from "@/src/components/sidebar/sidebar-contact-form";
import NewsletterSection from "@/src/components/sections/newsletter/newsletter-section";
import { shouldRenderSection } from "@/src/utils/should-render-section";
import ContainerLayout from "@/src/components/layouts/container-layout";
import { routes } from "@/lib/routes";
import { useRouter } from "next/navigation";
import CopyToClipboard from "@/src/components/utils/copy-to-clipboard";
import { newsShareLinks } from "@/src/data/newsShareLinks";
import { siteDetails } from "@/src/data/sit-details";

interface Props {
  tab?: string;
  name?: IProgram["name"];
  slug?: IProgram["slug"];
  subtitle?: IProgram["subtitle"];
  overview?: IProgram["overview"];
  duration?: IProgram["duration"];
  program_level?: IProgram["program_level"];
  credits_hours?: IProgram["credits_hours"];
  key_highlights?: IProgram["key_highlights"];
  intakes?: IProgram["intakes"];
  fees_structure?: IProgram["fees_structure"];
  admission_requirement_data?: IProgram["admission_requirement_data"];
  faq?: IProgram["faq"];
  information_document?: IProgram["information_document"];
  images?: IProgram["images"];
  information_video?: IProgram["information_video"];
}

const tabs = [{ key: "overview", title: "Overview" }];

export default function ProgramStatic({
  tab,
  name,
  slug,
  subtitle,
  overview,
  duration,
  program_level,
  credits_hours,
  key_highlights,
  intakes,
  fees_structure,
  admission_requirement_data,
  faq,
  information_document,
  images,
  information_video,
}: Props): JSX.Element {
  const currentUrl = `${siteDetails.SITE_URL}${routes.program}/${slug}`;
  const router = useRouter();
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeTab, setActiveTab] = useState(
    tab && tabs.some((t) => t.key === tab) ? tab : "overview",
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
          <TitleContentBlock
            name={name || "Program Overview"}
            overview={overview}
          />
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {duration && (
              <div className="p-4 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                  Duration
                </p>
                <p className="text-gray-800 font-medium">{duration}</p>
              </div>
            )}
            {program_level && (
              <div className="p-4 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                  Level
                </p>
                <p className="text-gray-800 font-medium">{program_level}</p>
              </div>
            )}
            {credits_hours && (
              <div className="p-4 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                  Credits/Hours
                </p>
                <p className="text-gray-800 font-medium">{credits_hours}</p>
              </div>
            )}
          </div>
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
                  onClick: (intake: IIntake) => {
                    if (slug && intake.id) {
                      router.push(`${routes.form}/${slug}/${intake.id}`);
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

          {key_highlights && (
            <div className="mt-6">
              <SubHeadingText>Key Highlights</SubHeadingText>
              {key_highlights && (
                <div
                  className="mt-2 text-gray-700 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: key_highlights }}
                />
              )}
            </div>
          )}
          {admission_requirement_data && (
            <div className="mt-6">
              <SubHeadingText>Requirements </SubHeadingText>
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
                          }}
                          className="w-full h-full object-cover"
                          controls
                          preload="metadata"
                          muted
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
    return null;
  };

  return (
    <>
      <HeroSection
        height="large"
        image={images?.[0]?.directus_files_id}
        description={subtitle}
        title={name}
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
        {fees_structure && fees_structure.length > 0 && (
          <ContainerLayout>
            <TitleContentBlock
              name="Program Fee Details"
              overview={`Here are all the fees for programs at ${name}. You can see the admission fee, tuition fee, and any other applicable charges. <br />Check each program for detailed information.`}
              isCenter={true}
            />

            <GenericTable<IFeesStructure>
              title=" "
              overview=""
              data={fees_structure}
              columns={[
                {
                  key: "fee_name",
                  title: "Fee Name",
                  render: (item) => item.fee_name || "N/A",
                },
                {
                  key: "amount",
                  title: "Amount",
                  render: (item) => item.amount || "-",
                },
                {
                  key: "program",
                  title: "Program",
                  render: (item) => item.program?.name || "N/A",
                },
              ]}
              button={{
                label: "View Details",
                onClick: (item) => {
                  window.location.href = `/program/${item.program?.slug}`;
                },
                variant: "secondary",
                size: "sm",
              }}
            />
          </ContainerLayout>
        )}

        {shouldRenderSection(faq) && <FaqSection data={faq} name={name} />}
        <NewsletterSection />
      </SpacingLayout>
    </>
  );
}
