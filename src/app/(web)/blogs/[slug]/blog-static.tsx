"use client";
import HeroSection from "@/src/components/sections/hero-section";
import { IBlog } from "@/src/graphql/types_api";
import { siteDetails } from "@/src/data/sit-details";
import { routes } from "@/lib/routes";
import CopyToClipboard from "@/src/components/utils/copy-to-clipboard";
import { newsShareLinks } from "@/src/data/newsShareLinks";
import { formatIntlOrdinalDate } from "@/src/utils/format-intl-ordinal-date";
import { Share2 } from "lucide-react";
import Link from "next/link";
import SpacingLayout from "@/src/components/layouts/spacing-layout";
import TwoColumnLayout from "@/src/components/layouts/two-column-layout";
import HeadingText from "@/components/ui/heading-text";
import KeywordSearch from "@/src/components/forms/keyword-search";
import { shouldRenderSection } from "@/src/utils/should-render-section";
import RecentBlogsSection from "@/src/components/sections/blog/recent-blogs-section";
import SubHeadingText from "@/components/ui/sub-heading-text";
import { getAssetUrl } from "@/src/utils/getAssetUrl";
import NewsletterSection from "@/src/components/sections/newsletter/newsletter-section";

interface Props {
  blog: IBlog;
  recentPosts: IBlog[];
}

export default function Blogstatic({ blog, recentPosts }: Props) {
  const images = blog.images ?? [];
  const hasImages = images.length > 0;
  const currentUrl = `${siteDetails.SITE_URL}${routes.blog}/${blog.slug}`;
  return (
    <>
      <HeroSection
        height="medium"
        slideshowImages={hasImages ? images : undefined}
        title={blog.title}
      >
        <section className="absolute z-50 w-full h-20 bottom-0 bg-black/30 backdrop-blur-sm rounded-lg overflow-hidden">
          <div className="h-full flex items-center justify-between">
            <div className="pl-3 md:pl-6 text-white">
              <p className="font-semibold">By {blog.author}</p>
              <p className="text-xs text-neutral-200">
                {blog.date_created
                  ? formatIntlOrdinalDate(blog.date_created)
                  : "—"}
              </p>
            </div>

            <div className="hidden lg:flex gap-4 items-center px-6">
              {newsShareLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.getUrl(currentUrl)}
                  target="_blank"
                  className="text-white"
                >
                  <social.icon size={18} />
                </Link>
              ))}

              <CopyToClipboard text={currentUrl}>
                <Share2 size={18} className="text-white cursor-pointer" />
              </CopyToClipboard>
            </div>
          </div>
        </section>
      </HeroSection>

      <SpacingLayout className="mt-10">
        <TwoColumnLayout
          sidebar={
            <div className="space-y-6">
              <div className="bg-bg rounded-lg border p-3">
                <HeadingText className="mb-2" level={6} heading={3}>
                  Search Blogs
                </HeadingText>

                <KeywordSearch redirectRoute={routes.blog} />
              </div>

              {shouldRenderSection(recentPosts) && (
                <RecentBlogsSection blogs={recentPosts} />
              )}
            </div>
          }
        >
          <article>
            <header className="mb-8">
              <HeadingText level={3} heading={0}>
                {blog.title}
              </HeadingText>

              <p className="mt-4 text-text-secondary">{blog.subtitle}</p>
            </header>

            <section className="space-y-6">
              {blog.blog_content && (
                <div
                  className="leading-relaxed rich_text_container"
                  dangerouslySetInnerHTML={{
                    __html: blog.blog_content,
                  }}
                />
              )}
            </section>
          </article>

          {blog.video && (
            <div className="mt-10">
              <SubHeadingText> Blogs video </SubHeadingText>
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black mt-4">
                <video
                  className="w-full h-full object-cover"
                  controls
                  preload="metadata"
                  muted
                  playsInline
                  poster={getAssetUrl(blog.images?.[0]?.directus_files_id)?.src}
                  aria-label={blog.title || "Blog video"}
                  title={blog.title || "Blog video"}
                  onPlay={(e) => {
                    e.currentTarget.volume = 0.3;
                  }}
                >
                  <source src={getAssetUrl(blog.video).src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          )}
        </TwoColumnLayout>
        <NewsletterSection />
      </SpacingLayout>
    </>
  );
}
