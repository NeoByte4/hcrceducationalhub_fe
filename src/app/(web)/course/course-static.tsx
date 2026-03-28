"use client";

import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import CourseCard from "@/src/components/cards/course/course-card";
import TitleContentBlock from "@/src/components/contents/title-content-block";
import KeywordSearch from "@/src/components/forms/keyword-search";
import ToursFilterForm from "@/src/components/forms/tours-filter-form";
import ContainerLayout from "@/src/components/layouts/container-layout";
import SpacingLayout from "@/src/components/layouts/spacing-layout";
import TwoColumnLayout from "@/src/components/layouts/two-column-layout";
import ErrorTextSection from "@/src/components/notifiers/error-text-section";
import HeroSection from "@/src/components/sections/hero-section";
import NewsletterSection from "@/src/components/sections/newsletter/newsletter-section";
import GenericTable from "@/src/components/sections/packages/GenericTable";
import SidebarContactForm from "@/src/components/sidebar/sidebar-contact-form";
import CopyToClipboard from "@/src/components/utils/copy-to-clipboard";
import { newsShareLinks } from "@/src/data/newsShareLinks";
import { ICourse, IIntake } from "@/src/graphql/types_api";
import { shouldRenderSection } from "@/src/utils/should-render-section";
import { Share2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  filteredCourses: ICourse[];
  intakes: IIntake[];
  heroCourse: ICourse | undefined;
  heroTitle: string;
  keyword: string;
  currentUrl: string;
  resolvedSearchParams: { keyword?: string };
}

export default function CourseStatic({
  filteredCourses,
  intakes,
  heroCourse,
  heroTitle,
  keyword,
  currentUrl,
  resolvedSearchParams,
}: Props) {
  const router = useRouter();

  return (
    <>
      <HeroSection
        height="large"
        slideshowImages={
          heroCourse?.banner_image?.map((img) => ({
            directus_files_id: img.directus_files_id,
          })) ?? []
        }
        title={heroTitle}
      >
        <section className="absolute z-50 w-full h-20 bottom-0 bg-black/30 backdrop-blur-sm rounded-lg overflow-hidden">
          <div className="h-full flex items-center justify-between">
            <div className="pl-3 md:pl-6">
              <span className="text-xs md:text-sm text-white">Overview</span>
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

      <SpacingLayout id="results" className="mt-16">
        <TwoColumnLayout sidebar={<SidebarContactForm />}>
          <TitleContentBlock
            name="IELTS & PTE Preparation Courses"
            overview="HCRC Educational Hub offers IELTS and PTE courses to help students improve English skills and achieve good scores for study abroad. We provide simple lessons, practice tests, and expert guidance in all four modules: Listening, Reading, Writing, and Speaking."
          />

          <div className="flex flex-col lg:flex-row lg:items-center gap-2 justify-between mt-10 mb-6">
            <div className="md:max-w-md flex items-center gap-2">
              <KeywordSearch redirectRoute={routes.course} />
              {keyword && (
                <Link href={`${routes.course}#results`}>
                  <Button variant="destructive">
                    <Trash2 />
                  </Button>
                </Link>
              )}
            </div>
            <ToursFilterForm
              redirectRoute={routes.course}
              destinations={[]}
              categories={[]}
              searchParams={resolvedSearchParams}
            />
          </div>

          {shouldRenderSection(filteredCourses) ? (
            <section className="grid gap-6 grid-cols-1 xl:grid-cols-2 items-stretch">
              {filteredCourses.map((course: ICourse) => (
                <CourseCard
                  key={course.slug}
                  title={course.title}
                  slug={course.slug}
                  description={course.description}
                  banner_image={course.banner_image}
                  highlights={course.highlights}
                  discound={course.discound}
                  duration={course.duration}
                  level={course.level}
                />
              ))}
            </section>
          ) : (
            <ErrorTextSection customMsg="No courses matching your query." />
          )}
        </TwoColumnLayout>

        <ContainerLayout>
          {intakes && intakes.length > 0 && (
            <div className="mt-6">
              <GenericTable
                title="Upcoming Intakes"
                overview="Check all upcoming intakes for our courses"
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
                    render: (item: IIntake) =>
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

        <NewsletterSection />
      </SpacingLayout>
    </>
  );
}
