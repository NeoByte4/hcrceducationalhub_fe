import React from "react";
import Image from "next/image";
import { Flame } from "lucide-react";
import Link from "next/link";
import StyledButton from "@/components/ui/styled-button";
import { routes } from "@/lib/routes";
import HeadingText from "@/components/ui/heading-text";
import { IBlog_MINIMAL } from "@/src/graphql/types_api";
import { getAssetUrl } from "@/src/utils/getAssetUrl";
import { MONTHS_SHORT } from "@/src/utils/months_data";

interface props {
  title: IBlog_MINIMAL["title"];
  description: IBlog_MINIMAL["subtitle"];
  image: IBlog_MINIMAL["images"];
  date: IBlog_MINIMAL["date_created"];
  readTime: IBlog_MINIMAL["readTime"];
  author: string;
  categories: string[];
  slug: IBlog_MINIMAL["slug"];
  data: IBlog_MINIMAL["blog_content"];
  video: IBlog_MINIMAL["video"];
}

const ArticleCard = ({
  title,
  description,
  image,
  date,
  readTime,
  author,
  slug,
}: props) => {
  const dateObj = new Date(date ?? new Date());
  const mainImage = image?.[0]?.directus_files_id;
  const img = mainImage
    ? getAssetUrl(mainImage)
    : { src: "/placeholder.jpg", alt: name };
  return (
    <div className="flex flex-col w-full h-full ">
      <div className="h-64 relative group overflow-hidden rounded-xl">
        <Image
          src={img.src}
          alt={img.alt ?? title}
          width={500}
          height={200}
          className="object-cover w-full h-full group-hover:scale-105 transition-all"
        />

        <p className="absolute size-12 rounded-full flex flex-col items-center justify-center bg-text-secondary/70 text-bg inset-3 border-1 border-border-first backdrop-blur-md">
          <span className="text-base font-semibold">{dateObj.getDate()}</span>
          <span className="text-xs font-medium -mt-1">
            {MONTHS_SHORT[dateObj.getMonth()]}
          </span>
        </p>
      </div>

      <div className="flex items-center gap-2 w-full my-4 overflow-x-hidden">
        <span className="text-text-secondary text-xs whitespace-nowrap">
          By {author.length > 16 ? `${author.slice(0, 16)}..` : author}
        </span>
        <span className="flex-1 h-[1px] bg-text-disabled mx-2"></span>
        <span className="text-text-secondary flex items-center gap-1 whitespace-nowrap text-xs">
          <Flame size={18} /> {readTime} min
        </span>
      </div>
      <div className="flex flex-col justify-between flex-1 ">
        <Link
          className="text-xl font-medium text-text-primary mb-2 font-secondary line-clamp-2"
          href={`${routes.blog}/${slug}`}
        >
          <HeadingText level={6} heading={3}>
            {title}
          </HeadingText>
        </Link>

        <div className="">
          <p className="text-base text-text-secondary line-clamp-2">
            {description}
          </p>

          <Link className="block mt-4 w-fit" href={`${routes.blog}/${slug}`}>
            <StyledButton>View Post</StyledButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
