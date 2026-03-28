"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Flame } from "lucide-react";
import { ICourse } from "@/src/graphql/types_api";
import { getAssetUrl } from "@/src/utils/getAssetUrl";
import HeadingText from "@/components/ui/heading-text";
import { routes } from "@/lib/routes";
import { Button } from "@/components/ui/button";

interface Props {
  title: ICourse["title"];
  slug: ICourse["slug"];
  description: ICourse["description"];
  banner_image: ICourse["banner_image"];
  highlights: ICourse["highlights"];
  duration: ICourse["duration"];
  level: ICourse["level"];
  discound: ICourse["discound"];
}

const CourseCard = ({
  title,
  slug,
  description,
  banner_image,
  highlights,
  duration,
  level,
  discound,
}: Props) => {
  const mainImage = banner_image?.[0]?.directus_files_id;

  const img = mainImage
    ? getAssetUrl(mainImage)
    : { src: "/placeholder.jpg", alt: title };

  return (
    <div className="group/card bg-white border border-border-first p-2 rounded-2xl overflow-hidden hover:border-primary-dark/30 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      <div className="relative aspect-[16/9] overflow-hidden">
        <Link href={`${routes.program}/${slug}`} className="block h-full">
          <Image
            src={img.src}
            alt={img.alt || title || "course image"}
            width={500}
            height={300}
            className="object-cover group-hover/card:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
        {discound && (
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-xs font-semibold text-primary-dark px-3.5 py-1.5 rounded-xl shadow-sm capitalize">
            {discound} OFF
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 w-full my-4">
        {duration && (
          <span className="text-text-secondary text-xs whitespace-nowrap">
            {duration}
          </span>
        )}
        <span className="flex-1 h-[1px] bg-text-disabled mx-2"></span>

        <span className="text-text-secondary flex items-center gap-1 whitespace-nowrap text-xs">
          <Flame size={16} /> {level}
        </span>
      </div>
      <div className="flex flex-col justify-between flex-1">
        <Link href={`${routes.course}/${slug}`} className="mb-2">
          <HeadingText level={6} heading={3}>
            {title}
          </HeadingText>
        </Link>

        <div>
          <p className="text-base text-text-secondary line-clamp-2">
            {description}
          </p>

          <ul className="mt-3 space-y-1">
            {highlights?.slice(0, 4).map((item, i) => (
              <li
                key={i}
                className="text-sm text-text-secondary flex items-center gap-2"
              >
                <span className="text-primary">✔</span>
                {item}
              </li>
            ))}
          </ul>
          <Link
            href={`${routes.course}/${slug}`}
            className="mt-6 block"
            aria-label={`View details for ${title} program`}
          >
            <Button className="w-full bg-bg-btn hover:bg-primary-dark transition-colors">
              View Program
              <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover/card:translate-x-0.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
