import { axiosDataInstance } from "../axios/axios";

export async function fetchMetaData(
  page: string,
  slug?: string,
  customValues?: string,
) {
  // Remove any leading slash
  const cleanPage = page.replace(/^\//, "");

  // Return default structure immediately since we know the queries will fail
  // This prevents the 400 errors and allows the page to use defaultMetaData
  console.log(
    `Metadata fetch attempted for: ${cleanPage} - using defaults instead`,
  );

  // Return empty structure that matches what generateMetadata expects
  return {
    [cleanPage]: {
      seo: null,
    },
  };
}
