import { Calendar, User, Clock, Tags, ArrowUpRight } from "lucide-react";
import { routes } from "@/lib/routes";
import Link from "next/link";
import Image from "next/image";
import HeadingText from "@/components/ui/heading-text";
import { IBlog } from "@/src/graphql/types_api";
import { getAssetUrl } from "@/src/utils/getAssetUrl";
import { formatIntlOrdinalDate } from "@/src/utils/format-intl-ordinal-date";
import { Button } from "@/components/ui/button";

interface props {
  title: IBlog["title"];
  subtitle: IBlog["subtitle"];
  images: IBlog["images"];
  date_created: IBlog["date_created"];
  readTime: IBlog["readTime"];
  author: IBlog["author"];
  categories: IBlog["categories"];
  slug: IBlog["slug"];
}

function DetailedArticleCard({
  title,
  subtitle,
  images,
  readTime,
  author,
  categories,
  slug,
  date_created,
}: props) {
  const blogLink = `${routes.blog}/${slug}`;
  const imageurl = images?.[0]?.directus_files_id;
  const img = imageurl
    ? getAssetUrl(imageurl)
    : { src: "/placeholder.jpg", alt: title };

  return (
    <>
      <div className="group border rounded-xl transition-all duration-300 bg-white overflow-hidden">
        <div className="flex flex-col lg:flex-row h-full">
          <div className="lg:w-2/5 relative overflow-hidden lg:rounded-l-xl rounded-t-xl lg:rounded-t-none h-64 sm:h-72 lg:h-auto">
            <Image
              fill
              src={img.src}
              alt={img.alt ?? `Image for ${title}`}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <div className="lg:w-3/5 flex flex-col justify-between p-3 lg:p-5">
            <div className="space-y-3">
              <div className="flex items-center gap-4 text-xs text-gray-500 flex-wrap">
                <div className="flex items-center gap-1">
                  <User size={16} />
                  <span className="font-medium">By {author}</span>
                </div>
                {readTime && (
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span className="font-medium">{readTime} min read</span>
                  </div>
                )}
                {date_created && (
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span className="font-medium">
                      {formatIntlOrdinalDate(date_created)}
                    </span>
                  </div>
                )}
              </div>

              <Link
                href={blogLink}
                className="mb-3 line-clamp-2"
                aria-label={`Read article: ${title}`}
              >
                <HeadingText level={6} heading={3}>
                  {title}
                </HeadingText>
              </Link>

              <p className="text-gray-600 line-clamp-3 leading-relaxed ">
                {subtitle}
              </p>
            </div>
            <div className="space-y-3 mt-4">
              {categories && (
                <p className="flex items-center gap-2 text-sm font-medium text-gray-500">
                  <Tags size={14} />
                  <span>{categories}</span>
                </p>
              )}
              <Link href={blogLink} className="mt-4">
                <Button aria-label={`View article details for ${title}`}>
                  Read Article
                  <ArrowUpRight size={16} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailedArticleCard;
