import { Metadata } from "next";
import { routes } from "@/lib/routes";
import { siteDetails } from "@/src/data/sit-details";
import { axiosDataInstance } from "@/src/axios/axios";
import HeroSection from "@/src/components/sections/hero-section";
import SpacingLayout from "@/src/components/layouts/spacing-layout";
import TwoColumnLayout from "@/src/components/layouts/two-column-layout";
import SidebarContactForm from "@/src/components/sidebar/sidebar-contact-form";
import TitleContentBlock from "@/src/components/contents/title-content-block";
import KeywordSearch from "@/src/components/forms/keyword-search";
import { Link, Link as LinkIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ToursFilterForm from "@/src/components/forms/tours-filter-form";
import ErrorTextSection from "@/src/components/notifiers/error-text-section";
import { shouldRenderSection } from "@/src/utils/should-render-section";
import UniversityCard from "@/src/components/cards/university/university-card";
import StudyAbroadProcess from "@/src/components/sections/study-abroad/study-abroad-process";
import { studyAbroadProcess } from "@/src/data/study-abroad-process";
import SiteReviewSection from "@/src/components/sections/reviews/site-reviews-seciton";
import NewsletterSection from "@/src/components/sections/newsletter/newsletter-section";

const defaultMetaData = {
  meta_title: `Explore Universities ~ ${siteDetails.site_title}`,
  meta_description: `${siteDetails.site_title} Study at Top Universities Worldwide, Educational Guidance, विदेश पढाइ, शैक्षिक सल्लाह.`,
};

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: defaultMetaData.meta_title,
    description: defaultMetaData.meta_description,
    alternates: { canonical: `${siteDetails.SITE_URL}${routes.university}` },
    openGraph: {
      title: defaultMetaData.meta_title,
      description: defaultMetaData.meta_description,
      url: `${siteDetails.SITE_URL}${routes.university}`,
      siteName: siteDetails.site_title,
    },
    twitter: {
      card: "summary_large_image",
      title: defaultMetaData.meta_title,
      description: defaultMetaData.meta_description,
    },
  };
};

const UNIVERSITIES_QUERY = `
query {
  institutions {
    id
    name
    slug
    subtitle
    location
    global_ranking
    established_date
    logo {
     id
    }
    video { id }
    images {
      directus_files_id { id filename_download description }
    }
  }
  countries {
    name
    slug
  }
  program {
    name
    slug
  }
}
`;

const fetchUniversities = async () => {
  const response = await axiosDataInstance.post("/graphql", {
    query: UNIVERSITIES_QUERY,
  });
  return response.data.data;
};

interface IUniversityImage {
  directus_files_id: {
    id: string;
    filename_download?: string;
    description?: string;
  };
}

interface IUniversity {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  location: string;
  global_ranking: string;
  video: { id: string } | null;
  images: IUniversityImage[];
  established_date: string;
  logo: { id: string } | null;
}

interface PageProps {
  searchParams: Promise<{ keyword?: string }>;
}

const Page = async ({ searchParams }: PageProps) => {
  const resolvedSearchParams = await searchParams;
  const data = await fetchUniversities();
  const universities: IUniversity[] = data.institutions ?? [];
  const keyword = resolvedSearchParams?.keyword ?? "";

  const filteredUniversities = keyword
    ? universities.filter(
        (u) =>
          u.name.toLowerCase().includes(keyword.toLowerCase()) ||
          u.location.toLowerCase().includes(keyword.toLowerCase()),
      )
    : universities;

  const heroUniversity = filteredUniversities[0];
  const title = heroUniversity?.name
    ? `Study at ${heroUniversity.name} with Expert Guidance`
    : "Explore Top Universities Worldwide";

  return (
    <>
      <HeroSection
        height="large"
        image={{
          id: heroUniversity?.images?.[0]?.directus_files_id?.id ?? "",
        }}
        title={title}
      />
      <SpacingLayout id="results" className="mt-16">
        <TwoColumnLayout sidebar={<SidebarContactForm />}>
          <TitleContentBlock
            name="Study Abroad Services"
            overview="HCRC Education Hub helps students achieve their international education goals with professional counselling, university application support, scholarship guidance, and student visa assistance."
          />

          <div className="flex flex-col lg:flex-row lg:items-center gap-2 justify-between relative z-[1000] mt-10 mb-6">
            <div className="md:max-w-md flex items-center gap-2">
              <KeywordSearch redirectRoute={routes.university} />
              {keyword && keyword.length > 0 && (
                <Link href={`${routes.university}#results`}>
                  <Button variant={"destructive"}>
                    <Trash2 />
                  </Button>
                </Link>
              )}
            </div>
            <div className="flex items-center justify-end">
              <div className="flex items-center justify-end">
                <ToursFilterForm
                  redirectRoute={routes.university}
                  destinations={filteredUniversities.map((u) => ({
                    title: u.name,
                    slug: u.slug,
                  }))}
                  categories={[]}
                  searchParams={resolvedSearchParams}
                />
              </div>
            </div>
          </div>

          {shouldRenderSection(filteredUniversities) ? (
            <section className="grid gap-6 grid-cols-1 xl:grid-cols-2 items-stretch">
              {filteredUniversities.map((university: IUniversity) => (
                <UniversityCard
                  key={university.slug}
                  image={university.images}
                  name={university.name}
                  subtitle={university.subtitle}
                  global_ranking={university.global_ranking}
                  rating={university.global_ranking}
                  slug={university.slug}
                  location={university.location}
                  established_date={university.global_ranking}
                  logo={university.logo}
                  video={university.video}
                />
              ))}
            </section>
          ) : (
            <ErrorTextSection customMsg="No universities matching this query." />
          )}
        </TwoColumnLayout>
        <SiteReviewSection />
        <NewsletterSection />
      </SpacingLayout>
    </>
  );
};

export default Page;
