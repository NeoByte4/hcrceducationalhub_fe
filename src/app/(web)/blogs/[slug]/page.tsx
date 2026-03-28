import { notFound } from "next/navigation";
import { cache } from "react";
import { routes } from "@/lib/routes";
import { axiosDataInstance } from "@/src/axios/axios";
import { siteDetails } from "@/src/data/sit-details";
import { Metadata } from "next";
import { IBlog } from "@/src/graphql/types_api";
import Blogstatic from "./blog-static";

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

// ─── Fetch (cached per request) ───────────────────────────────────────────────

const fetchBlog = cache(async (slug: string): Promise<ApiResponse> => {
  try {
    const response = await axiosDataInstance.post("/graphql", {
      query: BLOG_FULL,
      variables: { slug },
    });
    const data = response.data.data;
    return {
      blog: data.blog ?? [],
      allBlogs: data.allBlogs ?? [],
    };
  } catch (error) {
    console.error("Error fetching blog:", error);
    return { blog: [], allBlogs: [] };
  }
});

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { blog } = await fetchBlog(slug);
  const article = blog?.[0];

  if (!article) {
    return {
      title: "Blog Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  const meta_title = article.title;
  const meta_description =
    article.overview?.slice(0, 155) ?? article.subtitle ?? "";

  return {
    title: meta_title,
    description: meta_description,
    alternates: {
      canonical: `${siteDetails.SITE_URL}${routes.blog}/${slug}`,
    },
    openGraph: {
      title: meta_title,
      description: meta_description,
      url: `${siteDetails.SITE_URL}${routes.blog}/${slug}`,
      siteName: siteDetails.site_title,
      type: "article",
      publishedTime: article.date_created,
      authors: article.author ? [article.author] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: meta_title,
      description: meta_description,
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const { blog, allBlogs } = await fetchBlog(slug);
  const article = blog?.[0];

  if (!article) notFound();

  return <Blogstatic blog={article} recentPosts={allBlogs} />;
};

export default Page;
