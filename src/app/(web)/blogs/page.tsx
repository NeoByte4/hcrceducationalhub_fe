import HeadingText from "@/components/ui/heading-text";
import { routes } from "@/lib/routes";
import { axiosDataInstance } from "@/src/axios/axios";
import DetailedArticleCard from "@/src/components/cards/blogs/detailed-blogs-card";
import KeywordSearch from "@/src/components/forms/keyword-search";
import SpacingLayout from "@/src/components/layouts/spacing-layout";
import TwoColumnLayout from "@/src/components/layouts/two-column-layout";
import ErrorTextSection from "@/src/components/notifiers/error-text-section";
import HeroSection from "@/src/components/sections/hero-section";
import NewsletterSection from "@/src/components/sections/newsletter/newsletter-section";
import SidebarContactForm from "@/src/components/sidebar/sidebar-contact-form";
import CopyToClipboard from "@/src/components/utils/copy-to-clipboard";
import { newsShareLinks } from "@/src/data/newsShareLinks";
import { siteDetails } from "@/src/data/sit-details";
import { IBlog } from "@/src/graphql/types_api";
import { fetchMetaData } from "@/src/lib/fetch-metadata";
import { formatIntlOrdinalDate } from "@/src/utils/format-intl-ordinal-date";
import { Share2 } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

const defaultMetaData = {
  meta_title: `Study Abroad Blogs | Tips, Guides & Updates - ${siteDetails.site_title}`,
  meta_description: `Read expert blogs from ${siteDetails.site_title} about studying abroad. Get updates on university applications, visa processes, scholarships, intakes, and guidance for international students.`,
};

export const generateMetadata = async (): Promise<Metadata> => {
  const data = await fetchMetaData(`blog_page`);

  const { meta_title, meta_description } =
    data?.blog_page?.seo ?? defaultMetaData;

  return {
    title: meta_title,
    description: meta_description,
    alternates: {
      canonical: `${siteDetails.SITE_URL}${routes.blog}`,
    },
    openGraph: {
      title: meta_title,
      description: meta_description,
      url: `${siteDetails.SITE_URL}${routes.blog}`,
      siteName: siteDetails.site_title,
    },
    twitter: {
      card: "summary_large_image",
      title: meta_title,
      description: meta_description,
    },
  };
};

const BLOG_MINIMAL = `

query {
   blog {
    title
    slug
    subtitle
    date_created
    categories
     images {
      directus_files_id {
        id
        filename_download
        description
      }
    }
}}

`;
const fetchBlogs = async () => {
  const response = await axiosDataInstance.post("/graphql", {
    query: BLOG_MINIMAL,
  });
  return response.data.data;
};
interface PageProps {
  searchParams: Promise<{ keyword?: string; category?: string }>;
}

const Page = async ({ searchParams }: PageProps) => {
  const data = await fetchBlogs();
  const { keyword, category } = await searchParams;
  const hasImages = data.blog[0].images && data.blog[0].images.length > 0;
  const firstImage = hasImages
    ? data.blog[0].images[0].directus_files_id
    : null;
  const categories: string[] = data.blog.map((item: IBlog) => item.categories);
  const currentUrl = `${siteDetails.SITE_URL}${routes.blog}`;
  const keywordQuery = keyword?.toLowerCase() ?? "";
  const categoryQuery = category?.toLowerCase() ?? "";
  const filtered = data.blog.filter((blog: IBlog) => {
    const matchesKeyword = keywordQuery
      ? blog.title.toLowerCase().includes(keywordQuery)
      : true;

    const matchesCategory = categoryQuery
      ? Array.isArray(blog.categories)
        ? blog.categories.some(
            (cat: string) => cat?.toLowerCase() === categoryQuery,
          )
        : blog.categories?.toLowerCase() === categoryQuery
      : true;

    return matchesKeyword && matchesCategory;
  });

  return (
    <>
      <HeroSection
        height="medium"
        image={firstImage}
        description={`in our blogs have data and information about abroad educational jkourney`}
        title={`read our latest blogs`}
      >
        <section className="absolute z-50 w-full bottom-0  bg-black/30 backdrop-blur-sm rounded-lg overflow-hidden">
          <div className="h-20 flex items-center justify-between px-6">
            <div className="flex items-center gap-3 text-white">
              <div>
                <p className="font-semibold">Our Blogs</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {newsShareLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.getUrl(currentUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white transition-all"
                >
                  <social.icon size={18} />
                </Link>
              ))}

              <CopyToClipboard text={currentUrl}>
                <p className="text-white transition-all cursor-pointer">
                  <Share2 size={18} />
                </p>
              </CopyToClipboard>
            </div>
          </div>
        </section>
      </HeroSection>
      <SpacingLayout>
        <TwoColumnLayout
          className="mt-10"
          sidebar={
            <section className="space-y-6">
              <div className="bg-bg rounded-lg border p-3">
                <HeadingText className="mb-2" level={6} heading={3}>
                  Search Blogs
                </HeadingText>
                <KeywordSearch redirectRoute={routes.blog} />
              </div>

              <div className="bg-bg rounded-lg border p-3">
                <HeadingText className="mb-3" level={6} heading={3}>
                  Categories
                </HeadingText>

                <div className="flex flex-wrap gap-2">
                  {[...new Set(categories)].map((ct, index) => {
                    const current = false;

                    return (
                      <Link
                        key={index}
                        href={`${routes.blog}?category=${ct}`}
                        className={`px-4 py-1 rounded-full border text-sm transition-all ${
                          current
                            ? "border-primary-dark bg-primary-dark text-white hover:border-destructive hover:bg-destructive/75 hover:text-white"
                            : "hover:border-primary-dark"
                        }`}
                      >
                        {ct}
                      </Link>
                    );
                  })}
                </div>
              </div>
              <SidebarContactForm />
            </section>
          }
        >
          <HeadingText level={2} heading={2} className="sr-only" id="results">
            {categoryQuery || keywordQuery
              ? "Blog Search Results"
              : "Main Blog Articles"}
          </HeadingText>

          <div className="bg-bg rounded-lg border p-3 mb-4 md:hidden">
            <HeadingText className="mb-2" level={6} heading={3}>
              Search Blogs
            </HeadingText>
            <KeywordSearch redirectRoute={routes.blog} />
          </div>
          {filtered.length > 0 ? (
            <div className="space-y-6">
              {(categoryQuery || keywordQuery) && (
                <p className="text-text-secondary">
                  Showing {filtered.length} result{filtered.length > 1 && "s"}.
                  <Link
                    href={`${routes.blog}#results`}
                    className="text-text-primary ml-1 text-sm hover:underline"
                  >
                    clear
                  </Link>
                </p>
              )}
              {filtered.map((article: IBlog) => (
                <DetailedArticleCard
                  key={article.slug}
                  slug={article.slug}
                  title={article.title}
                  subtitle={article.subtitle}
                  images={article.images}
                  date_created={article.date_created}
                  readTime={article.readTime}
                  author="User"
                  categories={article.categories}
                />
              ))}
            </div>
          ) : (
            <ErrorTextSection customMsg="No blogs matching your query." />
          )}
        </TwoColumnLayout>
      </SpacingLayout>
      <NewsletterSection />
    </>
  );
};

export default Page;
