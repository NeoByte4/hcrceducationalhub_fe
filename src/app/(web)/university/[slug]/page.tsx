import { notFound } from "next/navigation";
import { Metadata } from "next";
import { cache } from "react";
import { routes } from "@/lib/routes";
import { siteDetails } from "@/src/data/sit-details";
import { IInstitution } from "@/src/graphql/types_api";
import { axiosDataInstance } from "@/src/axios/axios";
import UniversityStatic from "./university-static";

// ─── GraphQL Query ────────────────────────────────────────────────────────────

const INSTITUTION_FULL = `
  query ($slug: String!) {
    institutions(filter: { slug: { _eq: $slug } }) {
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
      images {
        directus_files_id {
          id
          filename_download
          description
        }
      }
      logo {
        id
        filename_download
        description
      }
      country {
        id
        name
        slug
      }
      video {
        id
        filename_download
        description
      }
      information_video {
        directus_files_id {
          id
          filename_download
          description
        }
      }
      program {
        id
        name
        slug
        subtitle
        duration
        program_level
        credits_hours
        images {
          directus_files_id {
            id
            filename_download
            description
          }
        }
      }
      intakes {
        id
        name
        start_date
        seats_available
        end_date
        program {
          name
          slug
        }
      }
      fees_structure {
        fee_name
        amount
        program {
          name
          slug
        }
        note
      }
      information_document {
        name
        file {
          id
          filename_download
          description
        }
        description
      }
      admission_requirement_data {
        academic_level
        gpa
        major_subject
        ielts
        toefl
        pte
        note
      }
      faq {
        question
        answer
      }
    }
  }
`;

// ─── Fetch (cached per request) ───────────────────────────────────────────────

const fetchInstitutionBySlug = cache(
  async (slug: string): Promise<IInstitution | null> => {
    try {
      const response = await axiosDataInstance.post("/graphql", {
        query: INSTITUTION_FULL,
        variables: { slug },
      });

      return response.data.data?.institutions?.[0] ?? null;
    } catch (error) {
      console.error("Error fetching institution:", error);
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
  const institution = await fetchInstitutionBySlug(slug);

  if (!institution) {
    return {
      title: "University Not Found",
      description: "The requested university could not be found.",
    };
  }

  const meta_title = `${institution.name} | Programs, Rankings & Admission Details`;
  const meta_description =
    institution.overview?.slice(0, 155) ??
    "Explore university programs, rankings, and admission details";

  return {
    title: meta_title,
    description: meta_description,
    alternates: {
      canonical: `${siteDetails.SITE_URL}${routes.university}/${slug}`,
    },
    openGraph: {
      title: meta_title,
      description: meta_description,
      url: `${siteDetails.SITE_URL}${routes.university}/${slug}`,
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

  const institution = await fetchInstitutionBySlug(slug);

  if (!institution) notFound();

  return (
    <UniversityStatic
      tab={resolvedSearchParams.tab ?? "overview"}
      id={institution.id}
      name={institution.name}
      slug={institution.slug}
      subtitle={institution.subtitle}
      overview={institution.overview}
      location={institution.location}
      latitude={institution.latitude}
      longitude={institution.longitude}
      global_ranking={institution.global_ranking}
      national_ranking={institution.national_ranking}
      established_date={institution.established_date}
      logo={institution.logo}
      video={institution.video}
      images={institution.images}
      country={institution.country}
      information_video={institution.information_video}
      program={institution.program}
      intakes={institution.intakes}
      fees_structure={institution.fees_structure}
      information_document={institution.information_document}
      admission_requirement_data={institution.admission_requirement_data}
      faq={institution.faq}
    />
  );
}
