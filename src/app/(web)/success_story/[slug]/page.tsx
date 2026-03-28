import { routes } from "@/lib/routes";
import { axiosDataInstance } from "@/src/axios/axios";
import { siteDetails } from "@/src/data/sit-details";
import { ISuccessStory } from "@/src/graphql/types_api";
import { Metadata } from "next";
import { cache } from "react";
import HeroSection from "@/src/components/sections/hero-section";
import SpacingLayout from "@/src/components/layouts/spacing-layout";
import TwoColumnLayout from "@/src/components/layouts/two-column-layout";
import HeadingText from "@/components/ui/heading-text";
import SidebarContactForm from "@/src/components/sidebar/sidebar-contact-form";
import ErrorTextSection from "@/src/components/notifiers/error-text-section";
import SuccessStoryCard from "@/src/components/cards/success_story/success_story-card";
import NewsletterSection from "@/src/components/sections/newsletter/newsletter-section";
import { getAssetUrl } from "@/src/utils/getAssetUrl";
import { GraduationCap, MapPin, BookOpen, Calendar, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { newsShareLinks } from "@/src/data/newsShareLinks";
import CopyToClipboard from "@/src/components/utils/copy-to-clipboard";
import { Share2 } from "lucide-react";

const SUCCESS_STORY_QUERY = `
query ($slug: String!) {
  single_story: success_story(filter: { slug: { _eq: $slug } }) {
    student_name
    slug
    country
    university
    course_taken
    score
    story
    admission_year
    testimonial_video { id }
    student_testimonial_message
    overview
    image {
      directus_files_id {
        id
        filename_download
        description
      }
    }
  }

  all_stories: success_story {
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

interface ApiResponse {
  single_story: ISuccessStory[];
  all_stories: ISuccessStory[];
}

const fetchSuccessStory = cache(async (slug: string): Promise<ApiResponse> => {
  try {
    const response = await axiosDataInstance.post("/graphql", {
      query: SUCCESS_STORY_QUERY,
      variables: { slug },
    });

    const data = response.data.data || {};

    return {
      single_story: data.single_story ?? [],
      all_stories: data.all_stories ?? [],
    };
  } catch (error) {
    console.error("Error fetching success story:", error);
    return {
      single_story: [],
      all_stories: [],
    };
  }
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { single_story } = await fetchSuccessStory(slug);

  const article = single_story?.[0];

  if (!article) {
    return {
      title: "Success Story Not Found",
      description: "The requested success story could not be found.",
    };
  }

  const meta_title = `${article.student_name} - Success Story`;
  const meta_description =
    article.overview?.slice(0, 160) ||
    article.story?.slice(0, 160) ||
    `Read how ${article.student_name} achieved their dream at ${article.university || "prestigious university"}.`;

  return {
    title: meta_title,
    description: meta_description,
    alternates: {
      canonical: `${siteDetails.SITE_URL}${routes.successStory}/${slug}`,
    },
    openGraph: {
      title: meta_title,
      description: meta_description,
      url: `${siteDetails.SITE_URL}${routes.successStory}/${slug}`,
      siteName: siteDetails.site_title,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: meta_title,
      description: meta_description,
    },
  };
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  const { single_story, all_stories } = await fetchSuccessStory(slug);

  const story = single_story?.[0];

  const relatedStories = all_stories.filter((s) => s.slug !== slug).slice(0, 4);

  if (!story) {
    return (
      <SpacingLayout>
        <ErrorTextSection customMsg="Success story not found." />
      </SpacingLayout>
    );
  }

  const {
    student_name,
    country,
    university,
    course_taken,
    score,
    admission_year,
    story: storyContent,
    overview,
    student_testimonial_message,
    testimonial_video,
    image,
  } = story;

  const mainImage = image?.[0]?.directus_files_id;
  const bgImage = getAssetUrl(mainImage);
  const currentUrl = `${siteDetails.SITE_URL}${routes.successStory}/${slug}`;

  const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL;

  return (
    <>
      <HeroSection
        height="medium"
        image={mainImage}
        title={student_name || "Success Story"}
        description={
          overview || `Read how ${student_name} achieved their dream abroad.`
        }
      >
        <section className="absolute z-50 w-full bottom-0 bg-black/30 backdrop-blur-sm">
          <div className="h-20 flex items-center justify-between px-6">
            <p className="text-white font-semibold">Success Story</p>
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
              <div className="bg-bg rounded-lg border p-4 space-y-4">
                <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-border-first">
                  <Image
                    src={bgImage.src}
                    alt={bgImage.alt || student_name || "Student"}
                    fill
                    className="object-cover"
                  />
                </div>

                <HeadingText level={5} className="text-text-primary">
                  {student_name}
                </HeadingText>

                <div className="space-y-2.5 text-sm text-text-secondary">
                  {university && (
                    <div className="flex items-start gap-2">
                      <GraduationCap className="w-4 h-4 text-text-disabled shrink-0 mt-0.5" />
                      <span>{university}</span>
                    </div>
                  )}
                  {country && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-text-disabled shrink-0" />
                      <span>{country}</span>
                    </div>
                  )}
                  {course_taken && (
                    <div className="flex items-start gap-2">
                      <BookOpen className="w-4 h-4 text-text-disabled shrink-0 mt-0.5" />
                      <span>{course_taken}</span>
                    </div>
                  )}
                  {admission_year && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-text-disabled shrink-0" />
                      <span>Class of {admission_year}</span>
                    </div>
                  )}
                  {score && (
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-warning fill-current shrink-0" />
                      <span className="font-semibold text-text-primary">
                        {score}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <SidebarContactForm />
            </section>
          }
        >
          {overview && (
            <div className="mb-6">
              <HeadingText level={4} className="text-text-primary mb-3">
                Overview
              </HeadingText>
              <p className="text-text-secondary leading-relaxed">{overview}</p>
            </div>
          )}

          {storyContent && (
            <div className="mb-6">
              <HeadingText level={4} className="text-text-primary mb-3">
                The Journey
              </HeadingText>
              <div
                className="text-text-secondary leading-relaxed rich_text_container"
                dangerouslySetInnerHTML={{ __html: storyContent }}
              />
            </div>
          )}

          {testimonial_video?.id && (
            <div className="mb-6">
              <HeadingText level={4} className="text-text-primary mb-3">
                Video Testimonial
              </HeadingText>
              <div className="relative aspect-video rounded-xl overflow-hidden border border-border-first">
                <video
                  src={`${DIRECTUS_URL}/assets/${testimonial_video.id}`}
                  controls
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {student_testimonial_message && (
            <div className="mb-8 bg-bg border border-border-first rounded-xl p-5">
              <HeadingText level={5} className="text-text-primary mb-2">
                In Their Own Words
              </HeadingText>
              <blockquote className="text-text-secondary italic leading-relaxed border-l-4 border-primary-dark pl-4">
                {student_testimonial_message}
              </blockquote>
            </div>
          )}
          {relatedStories.length > 0 && (
            <div>
              <HeadingText level={4} className="text-text-primary mb-4">
                More Success Stories
              </HeadingText>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedStories.map((s, index) => (
                  <SuccessStoryCard key={s.slug ?? index} story={s} />
                ))}
              </div>
            </div>
          )}
        </TwoColumnLayout>
      </SpacingLayout>

      <NewsletterSection />
    </>
  );
};

export default Page;
