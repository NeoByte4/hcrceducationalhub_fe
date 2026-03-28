import { routes } from "@/lib/routes";
import { axiosDataInstance } from "@/src/axios/axios";
import { siteDetails } from "@/src/data/sit-details";
import { fetchMetaData } from "@/src/lib/fetch-metadata";
import { Metadata } from "next";
import HeroSection from "@/src/components/sections/hero-section";
import CopyToClipboard from "@/src/components/utils/copy-to-clipboard";
import { newsShareLinks } from "@/src/data/newsShareLinks";
import Link from "next/link";
import { Share2 } from "lucide-react";
import SpacingLayout from "@/src/components/layouts/spacing-layout";
import TwoColumnLayout from "@/src/components/layouts/two-column-layout";
import HeadingText from "@/components/ui/heading-text";
import KeywordSearch from "@/src/components/forms/keyword-search";
import SidebarContactForm from "@/src/components/sidebar/sidebar-contact-form";
import ErrorTextSection from "@/src/components/notifiers/error-text-section";
import SuccessStoryCard from "@/src/components/cards/success_story/success_story-card";
import { ISuccessStory } from "@/src/graphql/types_api";
import NewsletterSection from "@/src/components/sections/newsletter/newsletter-section";

const defaultMetaData = {
  meta_title: `Success Stories - ${siteDetails.site_title}`,
  meta_description: `Explore real success stories of students who achieved their study abroad dreams with ${siteDetails.site_title}.`,
};

export const generateMetadata = async (): Promise<Metadata> => {
  const data = await fetchMetaData(`blog_page`);

  const { meta_title, meta_description } =
    data?.blog_page?.seo ?? defaultMetaData;

  return {
    title: meta_title,
    description: meta_description,
    alternates: {
      canonical: `${siteDetails.SITE_URL}${routes.successStory}`,
    },
    openGraph: {
      title: meta_title,
      description: meta_description,
      url: `${siteDetails.SITE_URL}${routes.successStory}`,
      siteName: siteDetails.site_title,
    },
    twitter: {
      card: "summary_large_image",
      title: meta_title,
      description: meta_description,
    },
  };
};

const SUCCESS_STORY_FULL = `
query {
  success_story {
    student_name 
    slug 
    country 
    university 
    course_taken 
    score
    admission_year
    image {
      directus_files_id {
        id
        filename_download
        description
      }
    }
  }
}
`;

const fetchSuccessStory = async () => {
  const response = await axiosDataInstance.post("/graphql", {
    query: SUCCESS_STORY_FULL,
  });
  return response.data.data;
};

interface PageProps {
  searchParams: Promise<{ keyword?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const data = await fetchSuccessStory();
  const { keyword } = await searchParams;

  const allStories: ISuccessStory[] = data?.success_story || [];

  const keywordQuery = keyword?.toLowerCase() ?? "";

  // Filter stories
  const filtered = allStories.filter((story: ISuccessStory) => {
    return keywordQuery
      ? story.student_name?.toLowerCase().includes(keywordQuery) ||
          story.university?.toLowerCase().includes(keywordQuery) ||
          story.country?.toLowerCase().includes(keywordQuery) ||
          story.course_taken?.toLowerCase().includes(keywordQuery) ||
          story.admission_year?.toString().includes(keywordQuery)
      : true;
  });

  // Safely get first image for HeroSection (convert null → undefined)
  const firstStory = allStories[0];
  const firstImageAsset =
    firstStory?.image?.[0]?.directus_files_id ?? undefined;

  const currentUrl = `${siteDetails.SITE_URL}${routes.successStory}`;

  return (
    <>
      <HeroSection
        height="medium"
        image={firstImageAsset}
        description="Real journeys, real success — explore how students achieved their study abroad dreams."
        title="Success Stories"
      >
        <section className="absolute z-50 w-full bottom-0 bg-black/30 backdrop-blur-sm">
          <div className="h-20 flex items-center justify-between px-6">
            <p className="text-white font-semibold">Student Success Stories</p>
            <div className="flex items-center gap-3">
              {newsShareLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.getUrl(currentUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white"
                >
                  <social.icon size={18} />
                </Link>
              ))}

              <CopyToClipboard text={currentUrl}>
                <p className="text-white cursor-pointer">
                  <Share2 size={18} />
                </p>
              </CopyToClipboard>
            </div>
          </div>
        </section>
      </HeroSection>

      <SpacingLayout>
        <TwoColumnLayout
          className="mt-10"
          sidebar={
            <section className="space-y-6">
              <div className="bg-bg rounded-lg border p-3">
                <HeadingText className="mb-2" level={6} heading={3}>
                  Search Success Stories
                </HeadingText>
                <KeywordSearch redirectRoute={routes.successStory} />
              </div>

              <SidebarContactForm />
            </section>
          }
        >
          <HeadingText level={2} heading={2} className="sr-only" id="results">
            {keywordQuery ? "Success Story Search Results" : "Success Stories"}
          </HeadingText>

          <div className="bg-bg rounded-lg border p-3 mb-4 md:hidden">
            <HeadingText className="mb-2" level={6} heading={3}>
              Search Success Stories
            </HeadingText>
            <KeywordSearch redirectRoute={routes.successStory} />
          </div>

          {filtered.length > 0 ? (
            <div>
              {keywordQuery && (
                <p className="text-text-secondary mb-4">
                  Showing {filtered.length} result
                  {filtered.length > 1 && "s"}.
                  <Link
                    href={`${routes.successStory}#results`}
                    className="text-text-primary ml-1 text-sm hover:underline"
                  >
                    clear
                  </Link>
                </p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                {filtered.map((story: ISuccessStory, index: number) => (
                  <SuccessStoryCard
                    key={story.slug ?? index}
                    story={story}
                    className="h-[380px]"
                  />
                ))}
              </div>
            </div>
          ) : (
            <ErrorTextSection customMsg="No success stories matching your query." />
          )}
        </TwoColumnLayout>
      </SpacingLayout>

      <NewsletterSection />
    </>
  );
}
