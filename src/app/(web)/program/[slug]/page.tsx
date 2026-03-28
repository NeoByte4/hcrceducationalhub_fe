import { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
import { routes } from "@/lib/routes";
import { siteDetails } from "@/src/data/sit-details";
import { IProgram } from "@/src/graphql/types_api";
import { axiosDataInstance } from "@/src/axios/axios";
import ProgramStatic from "./program-static";

// ─── GraphQL Query ────────────────────────────────────────────────────────────

const PROGRAM_FULL = `
  query ($slug: String!) {
    program(filter: { slug: { _eq: $slug } }) {
      id
      name
      slug
      subtitle
      overview
      duration
      program_level
      credits_hours
      key_highlights
      intakes {
        id
        name
        start_date
        seats_available
        end_date
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
      information_document {
        name
        file {
          id
          filename_download
          description
        }
        description
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
    }
  }
`;

// ─── Fetch (cached per request) ───────────────────────────────────────────────

const fetchProgramBySlug = cache(
  async (slug: string): Promise<IProgram | null> => {
    try {
      const response = await axiosDataInstance.post("/graphql", {
        query: PROGRAM_FULL,
        variables: { slug },
      });

      if (response.data.errors) {
        console.error(
          "GraphQL errors:",
          JSON.stringify(response.data.errors, null, 2),
        );
      }

      return response.data.data?.program?.[0] ?? null;
    } catch (error) {
      console.error("Error fetching program:", error);
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
  const program = await fetchProgramBySlug(slug);

  if (!program) {
    return {
      title: "Program Not Found",
      description: "The requested program could not be found.",
    };
  }

  const meta_title = `${program.name} | Study Abroad Program, Admission & Intakes`;
  const meta_description =
    program.overview?.slice(0, 155) ??
    `Explore ${program.name} for international students. Check new intakes, admission requirements, tuition fees, and visa process. Apply now to study abroad.`;

  return {
    title: meta_title,
    description: meta_description,
    keywords: `${program.name}, study abroad, international program, university admission, intake open, foreign study`,
    alternates: {
      canonical: `${siteDetails.SITE_URL}${routes.program}/${slug}`,
    },
    openGraph: {
      title: meta_title,
      description: meta_description,
      url: `${siteDetails.SITE_URL}${routes.program}/${slug}`,
      type: "website",
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

  const program = await fetchProgramBySlug(slug);

  if (!program) notFound();

  return (
    <ProgramStatic
      tab={resolvedSearchParams.tab ?? "overview"}
      name={program.name}
      slug={program.slug}
      subtitle={program.subtitle}
      overview={program.overview}
      duration={program.duration}
      program_level={program.program_level}
      credits_hours={program.credits_hours}
      key_highlights={program.key_highlights}
      intakes={program.intakes}
      fees_structure={program.fees_structure}
      admission_requirement_data={program.admission_requirement_data}
      faq={program.faq}
      information_document={program.information_document}
      images={program.images}
      information_video={program.information_video}
    />
  );
}
