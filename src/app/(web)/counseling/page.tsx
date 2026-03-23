import { routes } from "@/lib/routes";
import { axiosDataInstance } from "@/src/axios/axios";
import { siteDetails } from "@/src/data/sit-details";
import { Metadata } from "next";
import React from "react";
import CounselingStatic from "./counseling-static";

export async function generateMetadata(): Promise<Metadata> {
  const meta_title = "Study Abroad Counseling | HCRC Education";
  const meta_description =
    "Get expert guidance from HCRC Education for studying abroad. Learn about upcoming intakes, application processes, visa support, and personalized counseling.";

  return {
    title: meta_title,
    description: meta_description,
    alternates: {
      canonical: `${siteDetails.SITE_URL}${routes.counseling}`,
    },
    openGraph: {
      title: meta_title,
      description: meta_description,
      url: `${siteDetails.SITE_URL}${routes.counseling}`,
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
query GetCounseling {
  counseling {
    name
    overview
    subtitle
    targetAudience
   counseling_video {id}
   counseling_image {
       directus_files_id { id filename_download description }
   }
    inclusion
    exclusion
      steps {
      name
      overview
    }
    notes
      
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
}
`;
const fetchCounseling = async () => {
  try {
    const response = await axiosDataInstance.post(
      "/graphql",
      { query: DESTINATION_FULL },
      { headers: { "Content-Type": "application/json" } },
    );

    if (response.data.errors) {
      console.error("GraphQL error details:", response.data.errors);
      return null;
    }
    console.log("FULL DATA:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Axios fetch error:", error);
    return null;
  }
};

const Page = async () => {
  const data = await fetchCounseling();
  const counseling = data.counseling[0];
  const intakes = data.intakes || [];
  return (
    <>
      <CounselingStatic
        name={counseling.name}
        subtitle={counseling.subtitle}
        targetAudience={counseling.targetAudience}
        counseling_video={counseling.counseling_video}
        counseling_image={counseling.counseling_image}
        inclusion={counseling.inclusion}
        exclusion={counseling.exclusion}
        steps={counseling.steps}
        notes={counseling.notes}
        overview={counseling.overview}
        intakes={intakes}
      />
    </>
  );
};

export default Page;
