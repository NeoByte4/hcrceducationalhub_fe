import { notFound } from "next/navigation";
import { Metadata } from "next";
import { routes } from "@/lib/routes";
import { fetchMetaData } from "@/src/lib/fetch-metadata";
import { siteDetails } from "@/src/data/sit-details";
import { ICountry, IInstitution } from "@/src/graphql/types_api";
import { axiosDataInstance } from "@/src/axios/axios";
import CountryStatic from "./country-static";

interface MetadataResponse {
  country?: Array<{
    seo?: {
      meta_title: string;
      meta_description: string;
      keywords?: string;
    };
    name: string;
    overview?: string;
  }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const countryData = (await fetchMetaData(
    "country",
    slug,
  )) as MetadataResponse;

  if (!countryData?.country?.[0]) {
    return {
      title: "Destination Not Found",
      description: "The requested destination could not be found.",
    };
  }

  const data = countryData.country[0];

  const meta_title =
    data.seo?.meta_title ?? `${data.name} | Official Overview, Tours & Details`;
  const meta_description =
    data.seo?.meta_description ??
    (data.overview?.slice(0, 155) ||
      "Explore study opportunities in this destination");

  return {
    title: meta_title,
    description: meta_description,
    alternates: {
      canonical: `${siteDetails.SITE_URL}${routes.country}/${slug}`,
    },
    openGraph: {
      title: meta_title,
      description: meta_description,
      url: `${siteDetails.SITE_URL}${routes.country}/${slug}`,
      siteName: siteDetails.site_title,
    },
    twitter: {
      card: "summary_large_image",
      title: meta_title,
      description: meta_description,
    },
  };
}

export interface IDestWithTour extends ICountry {
  tours: IInstitution[];
}

interface DestinationResponse {
  countries: ICountry[];
}

const DESTINATION_FULL = `
query ($slug: String!) {
  countries(filter: { slug: { _eq: $slug } }) {  
    id
    name
    slug
    subtitle
    overview
    working_right
    language
    post_study_work_visa
    flag { id }
    video { id }

    requirements_data {
      name
      processing_time
      visa_fee
      biometrics
      interview
      health_insurance
      dependents_allowed
      notes

      requirement_document {
        name
      notes
       document {
         id 
         filename_download
       }
      }
    }
    
  information_video {
  directus_files_id {
    id
    filename_download
    description
  }
}

    images {
      directus_files_id {
        id
        filename_download
        description
      }
    }

    institutions {
      id
      name
      slug
      subtitle
      overview
      location
      latitude
      longitude
      global_ranking
      national_ranking
      established_date
      logo { id filename_download description }
      video { id filename_download description }
      images {
        directus_files_id {
          id
          filename_download
          description
        }
      }
    }
  }
}
`;

async function fetchDestinationBySlugWithFilters(
  slug: string,
  filters: {
    activity?: string;
    minDays?: string;
    maxDays?: string;
    minPrice?: string;
    maxPrice?: string;
    keyword?: string;
    location?: string;
  },
): Promise<DestinationResponse> {
  try {
    const variables = {
      slug,
    };

    const response = await axiosDataInstance.post("/graphql", {
      query: DESTINATION_FULL,
      variables,
    });

    return response.data.data as DestinationResponse;
  } catch (error) {
    console.error("Error fetching destination:", error);
    return { countries: [] };
  }
}

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;

  const data = await fetchDestinationBySlugWithFilters(
    slug,
    resolvedSearchParams,
  );

  const destination = data?.countries?.[0] ?? null;
  const locations = destination?.institutions
    ? Array.from(
        new Set(
          destination.institutions
            .map((i: IInstitution) => i.location)
            .filter((loc): loc is string => !!loc),
        ),
      ).map((loc) => ({
        title: loc,
        value: loc.toLowerCase().replace(/\s+/g, "-"),
      }))
    : [];
  if (!destination) notFound();
  return (
    <>
      <CountryStatic
        information_video={destination.information_video ?? []}
        tab={resolvedSearchParams.tab || "overview"}
        name={destination.name}
        subtitle={destination.subtitle}
        overview={destination.overview}
        working_right={destination.working_right}
        language={destination.language}
        post_study_work_visa={destination.post_study_work_visa}
        flag={destination.flag}
        video={destination.video}
        images={destination.images}
        institutions={destination.institutions}
        locations={locations}
        slug={destination.slug}
        requirements_data={destination.requirements_data}
        information_document={destination.information_document}
        data={{}}
      />
    </>
  );
}
