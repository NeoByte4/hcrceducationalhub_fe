// app/country/[slug]/page.tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { cache } from "react";
import { routes } from "@/lib/routes";
import { siteDetails } from "@/src/data/sit-details";
import { ICountry, IInstitution } from "@/src/graphql/types_api";
import { axiosDataInstance } from "@/src/axios/axios";
import CountryStatic from "./country-static";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ICountryWithInstitutions extends ICountry {
  institutions: IInstitution[];
}

interface CountryResponse {
  countries: ICountryWithInstitutions[];
}

// ─── GraphQL Query ────────────────────────────────────────────────────────────

const COUNTRY_FULL = `
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

      faq {
        question
        answer
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

// ─── Fetch (cached per request) ───────────────────────────────────────────────

const fetchCountryBySlug = cache(
  async (slug: string): Promise<ICountryWithInstitutions | null> => {
    try {
      const response = await axiosDataInstance.post("/graphql", {
        query: COUNTRY_FULL,
        variables: { slug },
      });

      return (response.data.data as CountryResponse)?.countries?.[0] ?? null;
    } catch (error) {
      console.error("Error fetching country:", error);
      return null;
    }
  },
);

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const country = await fetchCountryBySlug(slug);

  if (!country) {
    return {
      title: "Country Not Found",
      description: "The requested country could not be found.",
    };
  }

  const meta_title = `${country.name} | Official Overview, country,university & program`;
  const meta_description =
    country.overview?.slice(0, 155) ??
    "Explore study opportunities in this destination";

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

// ─── Page ─────────────────────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;

  const country = await fetchCountryBySlug(slug);

  if (!country) notFound();

  const locations = country.institutions
    ? Array.from(
        new Set(
          country.institutions
            .map((i: IInstitution) => i.location)
            .filter((loc): loc is string => !!loc),
        ),
      ).map((loc) => ({
        title: loc,
        value: loc.toLowerCase().replace(/\s+/g, "-"),
      }))
    : [];

  return (
    <CountryStatic
      information_video={country.information_video ?? []}
      tab={resolvedSearchParams.tab ?? "overview"}
      name={country.name}
      subtitle={country.subtitle}
      overview={country.overview}
      working_right={country.working_right}
      language={country.language}
      post_study_work_visa={country.post_study_work_visa}
      flag={country.flag}
      video={country.video}
      images={country.images}
      institutions={country.institutions}
      locations={locations}
      slug={country.slug}
      requirements_data={country.requirements_data}
      information_document={country.information_document}
      data={{}}
      faq={country.faq}
    />
  );
}
