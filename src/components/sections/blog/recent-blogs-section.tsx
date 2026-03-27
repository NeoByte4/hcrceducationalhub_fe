"use client";

import HeadingText from "@/components/ui/heading-text";
import { routes } from "@/lib/routes";
import { IBlog } from "@/src/graphql/types_api";
import { formatIntlOrdinalDate } from "@/src/utils/format-intl-ordinal-date";
import { getAssetUrl } from "@/src/utils/getAssetUrl";
import { Tags } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  blogs: IBlog[];
}

export default function RecentBlogsSection({ blogs }: Props) {
  return (
    <div className="bg-bg rounded-lg border p-3">
      <HeadingText className="mb-2" level={6} heading={3}>
        Recent Posts
      </HeadingText>

      <ul className="space-y-4">
        {blogs.map((blog) => {
          const firstImage = blog.images?.[0]?.directus_files_id;
          const img = firstImage ? getAssetUrl(firstImage) : null;

          return (
            <li key={blog.slug} className="grid grid-cols-3 gap-2 items-center">
              <div className="rounded-lg w-full aspect-[4.5/3] overflow-hidden">
                <Image
                  src={img?.src ?? "/images/placeholder.jpg"}
                  alt={img?.alt ?? blog.title ?? "blog image"}
                  width={80}
                  height={60}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="col-span-2">
                <Link href={`${routes.blog}/${blog.slug}`}>
                  <HeadingText className="line-clamp-2" level={0} heading={4}>
                    {blog.title}
                  </HeadingText>
                </Link>

                <p className="text-xs text-text-secondary my-1">
                  {blog.date_created
                    ? formatIntlOrdinalDate(blog.date_created)
                    : "—"}
                </p>

                <p className="text-xs flex items-center flex-wrap text-text-secondary">
                  <Tags size={14} className="mr-1" />

                  {(typeof blog.categories === "string"
                    ? [blog.categories]
                    : (blog.categories ?? [])
                  ).map(
                    (
                      cat:
                        | { blg_optns_categories_id?: { title: string } }
                        | string,
                      i: number,
                    ) => (
                      <span key={i}>
                        {i > 0 && ", "}
                        {typeof cat === "object"
                          ? cat?.blg_optns_categories_id?.title
                          : cat}
                      </span>
                    ),
                  )}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
