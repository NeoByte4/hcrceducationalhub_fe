import React from "react";
import Image from "next/image";
import { ArrowUpRight, MapPin, Star } from "lucide-react";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { getAssetUrl } from "@/src/utils/getAssetUrl";
import IconText from "../../primitives/icon-text";
import HeadingText from "@/components/ui/heading-text";
import { Button } from "@/components/ui/button";

interface IUniversityImage {
  directus_files_id: {
    id: string;
    filename_download?: string;
    description?: string;
  };
}

interface Props {
  image: IUniversityImage[];
  name: string;
  subtitle: string;
  global_ranking: string;
  rating: string;
  slug: string;
  location: string;
  established_date: string;
  logo: { id: string } | null;
  video: { id: string } | null;
}

const UniversityCard: React.FC<Props> = ({
  image,
  name,
  rating,
  slug,
  location,
  subtitle,
  global_ranking,
  established_date,
  logo,
  video,
}) => {
  const img = getAssetUrl(image[0]?.directus_files_id);
  console.log(name);
  return (
    <div className="bg-bg hover:bg-primary-dark/2 transition-all border rounded-lg p-2 relative flex flex-col h-full group/card">
      <div className="w-full aspect-[1/0.65] max-h-72 relative">
        <Link href={`${routes.university}/${slug}`}>
          <Image
            src={img.src}
            alt={img.alt ?? `Image for ${name}`}
            width={500}
            height={500}
            className="w-full h-full object-cover rounded-lg"
          />
          {global_ranking && (
            <div className="absolute top-2 right-2 bg-background text-xs font-semibold px-2 py-1 rounded shadow">
              #{global_ranking}
            </div>
          )}
          {logo && (
            <div className="absolute bottom-1 left-1 z-20 w-8 h-8 rounded-lg overflow-hidden border-2 border-white shadow-lg bg-white">
              <Image
                width={64}
                height={64}
                src={getAssetUrl(logo).src}
                alt={`${name} logo`}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <span className="sr-only">View details for {name} university</span>
        </Link>
      </div>

      <div className="p-1 flex flex-col justify-between mt-px h-full">
        <div>
          <div className="flex items-center justify-between text-sm font-medium font-secondary my-2">
            <IconText icon={MapPin} text={location} />
            <IconText icon={Star} text={"2.5"} />
          </div>

          <Link
            href={`${routes.university}/${slug}`}
            className="block w-fit hover:underline mb-2 hover:text-primary-dark"
          >
            <HeadingText level={6} heading={3}>
              {name}
            </HeadingText>
            <span className="sr-only">View details for {name} university</span>
          </Link>
          {subtitle && (
            <div
              className="line-clamp-2 text-text-secondary mb-3 text-sm"
              dangerouslySetInnerHTML={{ __html: subtitle }}
            />
          )}
        </div>

        <div className="grid grid-cols-2 border-y border-y-primary-dark border-dashed items-center">
          <div className="p-3 border-r border-r-primary-dark border-dashed">
            <p className="font-semibold">{} 34 Days </p>
            <div className="flex items-center flex-wrap gap-1 text-text-secondary mt-2">
              kkkk
            </div>
          </div>
          <div className="border-l border-l-primary-dark border-dashed p-3 pl-3">
            <p className="text-text-secondary text-xs capitalize">From</p>
            <p>
              <span className="inline-block font-bold font-secondary text-xl text-primary-dark">
                2444 ff
              </span>

              <span className="inline-block text-text-secondary line-through font-semibold text-sm ml-1">
                34
              </span>
            </p>
            <p className="text-text-secondary text-xs capitalize">per/psn</p>
          </div>
        </div>
        <Link
          aria-label={`View details for ${name}`}
          href={`${routes.university}/${slug}`}
          className="block mt-4"
        >
          <Button className="w-full">
            View Tour <ArrowUpRight />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default UniversityCard;
