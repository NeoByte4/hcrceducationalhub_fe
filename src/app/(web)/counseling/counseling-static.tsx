"use client";
import { Button } from "@/components/ui/button";
import HeadingText from "@/components/ui/heading-text";
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
import SiteReviewSection from "@/src/components/sections/reviews/site-reviews-seciton";
import SidebarContactForm from "@/src/components/sidebar/sidebar-contact-form";
import CopyToClipboard from "@/src/components/utils/copy-to-clipboard";
import { newsShareLinks } from "@/src/data/newsShareLinks";
import { siteDetails } from "@/src/data/sit-details";
import { ICounseling, IIntake } from "@/src/graphql/types_api";
import { getAssetUrl } from "@/src/utils/getAssetUrl";
import { ArrowUpRight, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface props {
  name: ICounseling["name"];
  subtitle: ICounseling["subtitle"];
  targetAudience: ICounseling["targetAudience"];
  counseling_video: ICounseling["counseling_video"];
  counseling_image: ICounseling["counseling_image"];
  inclusion: ICounseling["inclusion"];
  exclusion: ICounseling["exclusion"];
  steps: ICounseling["steps"];
  notes: ICounseling["notes"];
  overview: ICounseling["overview"];
  intakes: IIntake[];
}

export default function CounselingStatic({
  name,
  subtitle,
  targetAudience,
  counseling_video,
  counseling_image,
  inclusion,
  exclusion,
  steps,
  notes,
  overview,
  intakes,
}: props) {
  const currentUrl = `${siteDetails.SITE_URL}${routes.counseling}`;
  const hasImages = counseling_image && counseling_image.length > 0;
  const hasSteps = steps && steps.length > 0;
  const router = useRouter();
  const firstImage = hasImages
    ? getAssetUrl(counseling_image[0].directus_files_id)
    : null;

  return (
    <>
      <HeroSection
        height="medium"
        slideshowImages={hasImages ? counseling_image : undefined}
        description={subtitle}
        title={name}
      >
        <section className="absolute z-50 w-full h-20 bottom-0 bg-black/30 backdrop-blur-sm rounded-lg overflow-hidden">
          <div className="h-full flex items-center justify-between">
            <div className="pl-3 md:pl-6 text-bg">
              <span className="text-xs md:text-sm text-bg">Overview</span>
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

          {targetAudience && targetAudience.length > 0 && (
            <>
              <SubHeadingText className="mb-4">Target Audience</SubHeadingText>
              <ul className="list-disc">
                {targetAudience.map((target, index) => (
                  <li key={index}>{target}</li>
                ))}
              </ul>
            </>
          )}
        </TwoColumnLayout>
      </SpacingLayout>

      <TwoColumnLayout
        sidebar={
          <div className="space-y-6">
            {firstImage && (
              <div className="overflow-hidden rounded-lg aspect-[4/3]">
                <Image
                  src={firstImage.src}
                  width={500}
                  height={500}
                  alt={firstImage.alt ?? `Counseling image for ${name}`}
                  className="w-full h-full object-cover bg-center"
                  quality={75}
                />
              </div>
            )}
          </div>
        }
        reversed={true}
      >
        <div className="md:max-w-3xl mb-8">
          <TitleContentBlock
            name="Counseling Steps"
            overview="A step-by-step process to guide you through your study abroad journey, from initial discussion to flying abroad."
          />
        </div>

        {hasSteps ? (
          <>
            <Timeline
              items={steps.map((step) => ({
                title: step.name ?? "",
                description: step.overview ?? "",
              }))}
            />
            {notes && (
              <>
                <HeadingText level={4}>Note/s</HeadingText>
                <div>{notes}</div>
              </>
            )}
          </>
        ) : (
          <ErrorTextSection item="Steps" parent="counseling" />
        )}
      </TwoColumnLayout>
      {inclusion && exclusion && (
        <InclusionsExclusionsSection
          inclusions={inclusion}
          exclusions={exclusion}
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
                onClick: (intake: IIntake) => {
                  const slug = intake.program?.slug;
                  if (slug) {
                    router.push(`${routes.form}/${slug}/${intake.id}`);
                  }
                },
              }}
            />
          </div>
        )}
      </ContainerLayout>

      <SiteReviewSection />
      <NewsletterSection />
    </>
  );
}
