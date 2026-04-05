import { Metadata } from "next";
import { notFound } from "next/navigation";
import { routes } from "@/lib/routes";
import { siteDetails } from "@/src/data/sit-details";
import { axiosDataInstance } from "@/src/axios/axios";
import ApplicationPageStatic from "./application-static";

// ─── GraphQL Query ────────────────────────────────────────────────────────────

const APPLICATION_FULL = `
  query GetApplicationPage {
    application {
      name
      subtitle
      overview
      what_we_offer
      application_step {
        title
        overview
      }
      requirement_document
      why_choose_us
      images {
        directus_files_id {
          id
          filename_download
          description
        }
      }
    }
    institutions {
      name
      slug
      logo {
        id
      }
    }
    countries {
      name
      slug
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
      institution {
        name
        slug
      }
    }
  }
`;

// ─── Fetch ────────────────────────────────────────────────────────────────────

async function fetchApplicationPage() {
  try {
    const response = await axiosDataInstance.post("/graphql", {
      query: APPLICATION_FULL,
    });

    if (response.data.errors) {
      console.error("GraphQL errors:", response.data.errors);
      return null;
    }

    return response.data.data;
  } catch (error) {
    console.error("Error fetching application page:", error);
    return null;
  }
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata(): Promise<Metadata> {
  const meta_title =
    "Study Abroad Application Process Guide | HCRC Educational Hub";

  const meta_description =
    "Step-by-step guide to apply to top universities abroad with HCRC Educational Hub. Learn the full application process, required documents, intake dates, visa support, and expert counseling for international students.";
  return {
    title: meta_title,
    description: meta_description,
    alternates: {
      canonical: `${siteDetails.SITE_URL}${routes.application}`,
    },
    openGraph: {
      title: meta_title,
      description: meta_description,
      url: `${siteDetails.SITE_URL}${routes.application}`,
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

export default async function Page() {
  const data = await fetchApplicationPage();

  if (!data) notFound();

  const appData = data.application[0];

  return (
    <ApplicationPageStatic
      name={appData.name}
      subtitle={appData.subtitle}
      overview={appData.overview}
      what_we_offer={appData.what_we_offer}
      application_step={appData.application_step}
      requirement_document={appData.requirement_document}
      why_choose_us={appData.why_choose_us}
      images={appData.images ?? []}
      institutions={data.institutions ?? []}
      countries={data.countries ?? []}
      country={data.countries}
      intakes={data.intakes ?? []}
    />
  );
}
