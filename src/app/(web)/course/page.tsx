import { routes } from "@/lib/routes";
import { axiosDataInstance } from "@/src/axios/axios";
import { siteDetails } from "@/src/data/sit-details";
import { ICourse, IIntake } from "@/src/graphql/types_api";
import { fetchMetaData } from "@/src/lib/fetch-metadata";
import { Metadata } from "next";
import CourseStatic from "./course-static";

const defaultMetaData = {
  meta_title: `Explore Courses ~ ${siteDetails.site_title}`,
  meta_description: `${siteDetails.site_title} Discover our courses including IELTS, PTE preparation and study abroad counseling.`,
};

export const generateMetadata = async (): Promise<Metadata> => {
  const metaData = await fetchMetaData(`/course`);
  const seo = metaData?.course?.seo ?? defaultMetaData;
  const { meta_title, meta_description } = seo;

  return {
    title: meta_title,
    description: meta_description,
    openGraph: {
      title: meta_title,
      description: meta_description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/course`,
      siteName: siteDetails.site_title,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: meta_title,
      description: meta_description,
    },
  };
};

const COURSE_QUERY = `
  query {
    course {
      title
      slug
      discound
      description
      highlights
      level
      duration
      banner_image {
        directus_files_id {
          id
          filename_download
          description
        }
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
      institutions {
        name
        slug
      }
    }
  }
`;

const fetchCourse = async () => {
  const response = await axiosDataInstance.post("/graphql", {
    query: COURSE_QUERY,
  });
  return response.data.data;
};

interface PageProps {
  searchParams: Promise<{ keyword?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const data = await fetchCourse();

  const courses: ICourse[] = data?.course ?? [];
  const intakes: IIntake[] = data?.intakes ?? [];
  const keyword = resolvedSearchParams?.keyword ?? "";
  const currentUrl = `${siteDetails.SITE_URL}${routes.course}`;

  const filteredCourses = keyword
    ? courses.filter(
        (c) =>
          c.title?.toLowerCase().includes(keyword.toLowerCase()) ||
          c.description?.toLowerCase().includes(keyword.toLowerCase()),
      )
    : courses;

  const heroCourse = filteredCourses[0];
  const heroTitle = heroCourse?.title
    ? `Explore ${heroCourse.title} and More Courses`
    : "Discover Our Courses";

  return (
    <CourseStatic
      filteredCourses={filteredCourses}
      intakes={intakes}
      heroCourse={heroCourse}
      heroTitle={heroTitle}
      keyword={keyword}
      currentUrl={currentUrl}
      resolvedSearchParams={resolvedSearchParams}
    />
  );
}
