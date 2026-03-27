import { notFound } from "next/navigation";
import { routes } from "@/lib/routes";
import { axiosDataInstance } from "@/src/axios/axios";
import { siteDetails } from "@/src/data/sit-details";
import { fetchMetaData } from "@/src/lib/fetch-metadata";
import { Metadata } from "next";
import { IBlog } from "@/src/graphql/types_api";
import HeroSection from "@/src/components/sections/hero-section";
import Blogstatic from "./blog-static";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blogs = await fetchMetaData("blogs", slug, "title summary");

  if (!blogs || !Array.isArray(blogs.blogs) || blogs.blogs.length === 0) {
    return {
      title: "blogs Not Found",
      description: "The requested blogs could not be found.",
    };
  }

  const data = blogs.blogs[0];

  const { meta_title, meta_description } = {
    meta_title: data.seo ? data.seo.meta_title : data.title,
    meta_description: data.seo
      ? data.seo.meta_description
      : data.summary.slice(0, 155),
  };

  return {
    title: meta_title,
    description: meta_description,
    alternates: { canonical: `${siteDetails.SITE_URL}${routes.blog}/${slug}` },
    openGraph: {
      title: meta_title,
      description: meta_description,
      url: `${siteDetails.SITE_URL}${routes.blog}/${slug}`,
      siteName: siteDetails.site_title,
    },
    twitter: {
      card: "summary_large_image",
      title: meta_title,
      description: meta_description,
    },
  };
}

const BLOG_FULL = `
query ($slug: String!) {
  blog(filter: { slug: { _eq: $slug } }) {
    title
    slug
    subtitle
    date_created
    categories
    blog_content
    author
    video { id }
    images {
      directus_files_id {
        id
        filename_download
        description
      }
    }
  }

  allBlogs: blog(
    limit: 5
    sort: ["-date_created"]
  ) {
    title
    slug
    categories
    date_created
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
interface ApiResponse {
  blog: IBlog[];
  allBlogs: IBlog[];
}

async function fetchBlog(slug: string): Promise<ApiResponse> {
  const response = await axiosDataInstance.post("/graphql", {
    query: BLOG_FULL,
    variables: { slug },
  });
  const data = response.data.data;
  return {
    blog: data.blog ?? [],
    allBlogs: data.allBlogs ?? [],
  };
}

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const { blog, allBlogs } = await fetchBlog(slug);

  const article = blog?.[0];
  const recentPosts = allBlogs;

  if (!article) notFound();

  return (
    <>
      <Blogstatic blog={article} recentPosts={recentPosts} />{" "}
    </>
  );
};

export default Page;
