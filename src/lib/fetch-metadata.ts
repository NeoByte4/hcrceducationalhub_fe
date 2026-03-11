import { axiosDataInstance } from "../axios/axios";

export async function fetchMetaData(
  page: string,
  slug?: string,
  customValues?: string,
) {
  const query = `query { ${page}${slug ? `(filter: { slug: { _eq: "${slug}" } })` : ""} { ${slug ? `${customValues ? customValues : "title description"}` : ""}  seo { meta_title meta_description keywords } } }`;

  const res = await axiosDataInstance.post("/graphql", {
    query,
  });

  return res.data.data;
}
