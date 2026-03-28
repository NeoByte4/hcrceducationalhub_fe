import { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
import { routes } from "@/lib/routes";
import { siteDetails } from "@/src/data/sit-details";
import { axiosDataInstance } from "@/src/axios/axios";
import { IIntake, IProgram } from "@/src/graphql/types_api";
import HeroSection from "@/src/components/sections/hero-section";
import ProgramBookingStatic from "./application-form-static";

// ─── GraphQL Query ────────────────────────────────────────────────────────────

const PROGRAM_FORM_QUERY = `
  query GetProgramForm($slug: String!) {
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
      images {
        directus_files_id { id filename_download description }
      }
      institution {
        id
        name
        slug
        logo { id }
      }
      intakes {
        id
        name
        start_date
        end_date
        seats_available
      }
    }
  }
`;

// ─── Types ────────────────────────────────────────────────────────────────────

export interface IApplication_Form {
  id: string;
  slug: IProgram["slug"];
  name: IProgram["name"];
  subtitle?: IProgram["subtitle"];
  images?: IProgram["images"];
  institution?: IProgram["institution"];
  intakes?: IProgram["intakes"];
}

// ─── Fetch (cached per request) ───────────────────────────────────────────────

const fetchProgramForm = cache(
  async (slug: string, id?: string): Promise<IProgram | null> => {
    try {
      const response = await axiosDataInstance.post("/graphql", {
        query: PROGRAM_FORM_QUERY,
        variables: { slug },
      });

      if (response.data?.errors) {
        console.error(response.data.errors);
        return null;
      }

      const programsArray: IProgram[] = response.data?.data?.program ?? [];
      const program = programsArray[0] ?? null;

      if (program && id) {
        program.intakes =
          program.intakes?.filter((i: IIntake) => i.id === id) ?? [];
      }

      return program;
    } catch (err) {
      console.error("Error fetching program form:", err);
      return null;
    }
  },
);

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}): Promise<Metadata> {
  const { slug, id } = await params;
  const program = await fetchProgramForm(slug, id);

  if (!program) {
    return {
      title: "Program Not Found | HCRC Education",
      description: "The requested program could not be found.",
    };
  }

  const intake = program.intakes?.[0];

  const title = `${program.name} Application ${intake?.name ?? ""} | HCRC Education`;
  const description = `Apply now for ${program.name} with HCRC Education. ${
    program.subtitle?.slice(0, 120) ??
    "Get personalized guidance and application support."
  }`;
  const url = `${siteDetails.SITE_URL}${routes.form}/${program.slug}/${id}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteDetails.site_title,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const { slug, id } = await params;
  const program = await fetchProgramForm(slug, id);

  if (!program) notFound();

  const intake = program.intakes?.[0];

  return (
    <>
      <HeroSection
        height="small"
        image={program.images?.[0]?.directus_files_id}
        title="Apply Now"
        description="Ready to move forward? Submit your application today and let us help you achieve your academic goals."
      />
      <div className="my-10" />
      <ProgramBookingStatic program={program} intakeId={intake?.id ?? ""} />
    </>
  );
}
