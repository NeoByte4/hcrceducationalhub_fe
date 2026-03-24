import { routes } from "@/lib/routes";
import { axiosDataInstance } from "@/src/axios/axios";
import { siteDetails } from "@/src/data/sit-details";
import { Metadata } from "next";
import React from "react";
import ApplicationPageStatic from "./application-static";
export async function generateMetadata(): Promise<Metadata> {
  const meta_title = "Study Abroad Counseling | HCRC Education";
  const meta_description =
    "Get expert guidance from HCRC Education for studying abroad. Learn about upcoming intakes, application processes, visa support, and personalized counseling.";

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
const DESTINATION_FULL = `
query GetApplicationPage {
  application {
    name
    subtitle
    overview
    what_we_offer
    application_step{
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
    name
    start_date
    seats_available
    end_date
    program {
    name
    slug
    }
    institutions{
    name
    slug
    }
    }
}`;
const fetchCounseling = async () => {
  try {
    const response = await axiosDataInstance.post(
      "/graphql",
      { query: DESTINATION_FULL },
      { headers: { "Content-Type": "application/json" } },
    );

    if (response.data.errors) {
      console.error("GraphQL errors:", response.data.errors);
      return null;
    }

    return response.data.data;
  } catch (error) {
    console.error("Axios fetch error:", error);
    return null;
  }
};

const Page = async () => {
  const data = await fetchCounseling();
  if (!data) return <p>Failed to load application data.</p>;
  const appData = data.application[0];

  return (
    <>
      <ApplicationPageStatic
        name={appData.name}
        subtitle={appData.subtitle}
        overview={appData.overview}
        what_we_offer={appData.what_we_offer}
        application_step={appData.application_step}
        requirement_document={appData.requirement_document}
        why_choose_us={appData.why_choose_us}
        images={appData.images || []}
        institutions={data.institutions || []}
        countries={data.countries || []}
        country={data.countries}
        intakes={data.intakes || []}
      />
    </>
  );
};

export default Page;
