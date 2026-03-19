import { Metadata } from "next";
import { routes } from "@/lib/routes";
import { siteDetails } from "@/src/data/sit-details";
import { axiosDataInstance } from "@/src/axios/axios";
import HeroSection from "@/src/components/sections/hero-section";
import GobalDestinationSearch from "@/src/components/forms/global-destination-search";
import SpacingLayout from "@/src/components/layouts/spacing-layout";
import TitleContentBlock from "@/src/components/contents/title-content-block";
import KeywordSearch from "@/src/components/forms/keyword-search";
import { Link, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContainerLayout from "@/src/components/layouts/container-layout";
import CountryCard from "@/src/components/cards/country/destination-card";
import ErrorTextSection from "@/src/components/notifiers/error-text-section";
import NewsletterSection from "@/src/components/sections/newsletter/newsletter-section";

const defaultMetaData = {
  meta_title: `Explore Countries ~ ${siteDetails.site_title}`,
  meta_description: `${siteDetails.site_title}  Study in Foreign Countries, Educational Guidance, विदेश पढाइ, शैक्षिक सल्लाह.`,
};

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: defaultMetaData.meta_title,
    description: defaultMetaData.meta_description,
    alternates: { canonical: `${siteDetails.SITE_URL}${routes.country}` },
    openGraph: {
      title: defaultMetaData.meta_title,
      description: defaultMetaData.meta_description,
      url: `${siteDetails.SITE_URL}${routes.country}`,
      siteName: siteDetails.site_title,
    },
    twitter: {
      card: "summary_large_image",
      title: defaultMetaData.meta_title,
      description: defaultMetaData.meta_description,
    },
  };
};

const COUNTRIES_QUERY = `
query {
  countries {
    name
    slug
    video { id }
    images {
      directus_files_id { id filename_download description }
    }
    }
  institutions {
    name
    slug
  }
  program {
    name
    slug
  }
}
`;

const fetchCountries = async () => {
  const response = await axiosDataInstance.post("/graphql", {
    query: COUNTRIES_QUERY,
  });
  return response.data.data;
};

interface ICountryImage {
  directus_files_id: {
    id: string;
    filename_download?: string;
    description?: string;
  };
}

interface ICountry {
  name: string;
  slug: string;
  video: { id: string } | null;
  images: ICountryImage[];
}

interface PageProps {
  searchParams: Promise<{ keyword?: string }>;
}

const Page = async ({ searchParams }: PageProps) => {
  const data = await fetchCountries();
  const countries: ICountry[] = data.countries ?? [];
  const institutions = data.institutions ?? [];
  const program = data.program ?? [];

  const { keyword } = await searchParams;
  const query = keyword?.toLowerCase() ?? "";

  const filteredCountries = query
    ? countries.filter((c) => c.name.toLowerCase().includes(query))
    : countries;

  const heroCountry = filteredCountries[0];
  const title = `Study in ${heroCountry?.name} with Expert Guidance `;

  return (
    <>
      <HeroSection
        height="large"
        image={{ id: heroCountry?.images?.[0]?.directus_files_id?.id ?? "" }}
        video={heroCountry?.video ?? undefined}
        title={title ?? "Explore Countries"}
      >
        <div className="absolute z-50 p-3 -translate-x-1/2 left-1/2 w-full -bottom-[45%] sm:bottom-0">
          <GobalDestinationSearch
            country={countries}
            institution={institutions}
            program={program}
          />
        </div>
      </HeroSection>
      <div id="results"></div>
      <div className="my-80 sm:my-16"></div>
      <SpacingLayout>
        <ContainerLayout>
          <div className="md:max-w-3xl mb-8">
            <TitleContentBlock
              name="Explore Global Education"
              overview="Discover the best destinations for higher education worldwide with personalized guidance. From universities in the US, UK, Canada, Australia, and Europe, find programs that match your academic goals."
            />
          </div>
          <div className="md:max-w-md mb-3 flex items-center gap-2">
            <KeywordSearch redirectRoute={routes.country} />
            {query && query.length > 0 && (
              <Link href={`${routes.country}#results`}>
                <Button variant={"destructive"}>
                  <Trash2 />
                </Button>
              </Link>
            )}
          </div>
          {filteredCountries.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredCountries.map((destination: ICountry, i: number) => (
                <div
                  key={destination.slug}
                  className={`w-full aspect-square max-h-96 ${
                    (i + 1) % 3 === 0 && "md:col-span-2 lg:col-span-1"
                  }`}
                >
                  <CountryCard
                    location={destination.name}
                    image={
                      destination.images?.[0]?.directus_files_id ?? { id: "" }
                    }
                    href={`${routes.country}/${destination.slug}`}
                  />
                </div>
              ))}
            </div>
          ) : (
            <ErrorTextSection customMsg="No Destination mathing your query" />
          )}
        </ContainerLayout>
        <NewsletterSection />
      </SpacingLayout>
    </>
  );
};

export default Page;
