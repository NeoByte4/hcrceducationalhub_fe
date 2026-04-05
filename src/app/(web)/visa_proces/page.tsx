import { routes } from "@/lib/routes";
import { axiosDataInstance } from "@/src/axios/axios";
import { siteDetails } from "@/src/data/sit-details";
import { Metadata } from "next";
import VisaProcessStatic from "./visa_process-static";

export async function generateMetadata(): Promise<Metadata> {
  const meta_title = "Study Abroad Visa Process | HCRC Education";
  const meta_description =
    "Get expert guidance from HCRC Education for studying abroad. Learn about upcoming intakes, application processes, visa support, and personalized counseling.";

  return {
    title: meta_title,
    description: meta_description,
    alternates: {
      canonical: `${siteDetails.SITE_URL}${routes.visaProcess}`,
    },
    openGraph: {
      title: meta_title,
      description: meta_description,
      url: `${siteDetails.SITE_URL}${routes.visaProcess}`,
      siteName: siteDetails.site_title,
    },
  };
}

const VISAProcess_QUERY = `
query GETVisaProcess {
  visa_page {
    title
    subtitle
    overview
    exams
    features
    scholarship
    class_types
    notes
    image {
      directus_files_id {
        id
        filename_download
        description
      }
    }
    visa_steps {
      title
      description
    }
  }

  intakes(limit: 5) {
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

const fetchVisaPageData = async () => {
  try {
    const response = await axiosDataInstance.post("/graphql", {
      query: VISAProcess_QUERY,
    });

    if (response.data.errors) {
      console.error("GraphQL errors:", response.data.errors);
      return null;
    }
    return {
      visaPage: response.data.data.visa_page,
      intakes: response.data.data.intakes,
    };
  } catch (error) {
    console.error("Error fetching visa page data:", error);
    return null;
  }
};

const Page = async () => {
  const data = await fetchVisaPageData();

  if (!data || !data.visaPage?.[0]) return null;

  const visaPage = data.visaPage[0];

  return (
    <>
      <VisaProcessStatic
        title={visaPage.title ?? ""}
        subtitle={visaPage.subtitle ?? ""}
        overview={visaPage.overview ?? ""}
        visa_steps={visaPage.visa_steps ?? []}
        exams={visaPage.exams ?? []}
        features={visaPage.features ?? []}
        scholarship={visaPage.scholarship ?? []}
        class_types={visaPage.class_types ?? []}
        image={visaPage.image ?? []}
        notes={visaPage.notes ?? ""}
        intakes={data.intakes ?? []}
      />
    </>
  );
};

export default Page;
