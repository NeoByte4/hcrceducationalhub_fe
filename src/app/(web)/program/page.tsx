import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import { axiosDataInstance } from "@/src/axios/axios";
import ProgramCard from "@/src/components/cards/program/program-card";
import TitleContentBlock from "@/src/components/contents/title-content-block";
import KeywordSearch from "@/src/components/forms/keyword-search";
import ToursFilterForm from "@/src/components/forms/tours-filter-form";
import SpacingLayout from "@/src/components/layouts/spacing-layout";
import TwoColumnLayout from "@/src/components/layouts/two-column-layout";
import ErrorTextSection from "@/src/components/notifiers/error-text-section";
import HeroSection from "@/src/components/sections/hero-section";
import SidebarContactForm from "@/src/components/sidebar/sidebar-contact-form";
import { siteDetails } from "@/src/data/sit-details";
import { fetchMetaData } from "@/src/lib/fetch-metadata";
import { shouldRenderSection } from "@/src/utils/should-render-section";
import { IProgram } from "@/src/graphql/types_api";
import { Trash2 } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import SiteReviewSection from "@/src/components/sections/reviews/site-reviews-seciton";
import NewsletterSection from "@/src/components/sections/newsletter/newsletter-section";

const defaultMetaData = {
  meta_title: `Explore Academic Programs ~ ${siteDetails.site_title}`,
  meta_description: `${siteDetails.site_title} Discover undergraduate, graduate, and doctoral programs at top universities worldwide. Find the perfect program for your academic goals.`,
};

export const generateMetadata = async (): Promise<Metadata> => {
  const metaData = await fetchMetaData(`/program`);
  const { meta_title, meta_description } =
    metaData.program.seo ?? defaultMetaData;
  return {
    title: meta_title,
    description: meta_description,
    openGraph: {
      title: meta_title,
      description: meta_description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/program`,
      siteName: siteDetails.site_title,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: meta_title,
      description: meta_description,
    },
  };
};

const PROGRAMS_QUERY = `
query {
  program {
    id
    name
    slug
    subtitle
    overview
    duration
    program_level
    credits_hours
    key_highlights
    images {
      directus_files_id { 
        id 
        filename_download 
        description 
      }
    }
    institution {
      id
      name
      slug
      location
      logo {
        id
        filename_download
        description
      }
    }
  }
}
`;

const fetchPrograms = async () => {
  const response = await axiosDataInstance.post("/graphql", {
    query: PROGRAMS_QUERY,
  });
  return response.data.data;
};

interface PageProps {
  searchParams: Promise<{
    destination?: string;
    activity?: string;
    location?: string;
    minDays?: string;
    maxDays?: string;
    minPrice?: string;
    maxPrice?: string;
    keyword?: string;
  }>;
}

const Page = async ({ searchParams }: PageProps) => {
  const resolvedSearchParams = await searchParams;
  const data = await fetchPrograms();
  const programs: IProgram[] = data.program ?? [];
  const keyword = resolvedSearchParams?.keyword ?? "";

  const filteredPrograms = keyword
    ? programs.filter(
        (p) =>
          p.name.toLowerCase().includes(keyword.toLowerCase()) ||
          p.institution?.name.toLowerCase().includes(keyword.toLowerCase()),
      )
    : programs;

  const heroProgram = filteredPrograms[0];
  const title = heroProgram?.name
    ? `Explore ${heroProgram.name} and More Programs`
    : "Discover Academic Programs Worldwide";

  return (
    <>
      <HeroSection
        height="large"
        image={{
          id: heroProgram?.images?.[0]?.directus_files_id?.id ?? "",
        }}
        title={title}
      />

      <SpacingLayout id="results" className="mt-16">
        <TwoColumnLayout sidebar={<SidebarContactForm />}>
          <TitleContentBlock
            name="All Academic Programs"
            overview="Browse our complete catalog of undergraduate, graduate, and doctoral programs at top universities worldwide. Find the perfect program that matches your academic interests and career goals."
          />

          <div className="flex flex-col lg:flex-row lg:items-center gap-2 justify-between relative z-[1000] mt-10 mb-6">
            <div className="md:max-w-md flex items-center gap-2">
              <KeywordSearch redirectRoute={routes.program} />
              {keyword && keyword.length > 0 && (
                <Link href={`${routes.program}#results`}>
                  <Button variant="destructive">
                    <Trash2 />
                  </Button>
                </Link>
              )}
            </div>

            <div className="flex items-center justify-end">
              <ToursFilterForm
                redirectRoute={routes.program}
                destinations={[]}
                categories={[]}
                searchParams={resolvedSearchParams}
              />
            </div>
          </div>

          {/* {shouldRenderSection(filteredPrograms) ? (
            <section className="grid gap-6 grid-cols-1 xl:grid-cols-2 items-stretch">
              {filteredPrograms.map((program: IProgram) => (
                <ProgramCard key={program.slug} program={program} />
              ))}
            </section>
          ) : (
            <ErrorTextSection customMsg="No programs matching your query." />
          )} */}
        </TwoColumnLayout>
        <SiteReviewSection />
        <NewsletterSection />
      </SpacingLayout>
    </>
  );
};

export default Page;
