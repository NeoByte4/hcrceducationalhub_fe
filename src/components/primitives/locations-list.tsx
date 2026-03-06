import Image from "next/image";
import Link from "next/link";
import { IProgram } from "@/src/graphql/types_api";
import { getAssetUrl } from "@/src/utils/getAssetUrl";

import { routes } from "@/lib/routes";

import { MapPin, Star } from "lucide-react";
import HeadingText from "@/components/ui/heading-text";
import Ribbon from "./ribbon";
import IconText from "./icon-text";

interface ProgramCardProps {
  program: IProgram;
  discount?: number;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program, discount }) => {
  const {
    name,
    slug,
    overview,
    program_level,
    images,
    rating = 2.4,
    institution,
  } = program;

  const shouldShowDiscount = discount != null && discount > 0;

  const mainImage = images?.[0]?.directus_files_id;
  const bgImage = mainImage
    ? getAssetUrl(mainImage)
    : { src: "/placeholder.jpg", alt: name };

  return (
    <div className="bg-bg hover:bg-primary-dark/2 transition-all border rounded-lg p-2 relative flex flex-col h-full group/card">
      <div className="w-full aspect-[1/0.65] max-h-72 relative">
        <Link href={`${routes.program}/${slug}`}>
          <Image
            src={bgImage.src}
            alt={bgImage.alt}
            width={500}
            height={500}
            className="w-full h-full object-cover rounded-lg"
          />
          <span className="sr-only">View details for {name}</span>
        </Link>
        {program_level && (
          <span className="absolute top-3 left-3 text-xs font-secondary text-primary-dark bg-bg rounded-xl px-3 py-1.5 font-semibold capitalize z-10">
            {program_level}
          </span>
        )}
        {shouldShowDiscount && (
          <div className="absolute top-0 right-0 z-10">
            <Ribbon>
              <span className="text-[16px] text-white font-extrabold font-secondary">
                {discount}%
              </span>
              <span className="block -mt-[5px] text-xs text-white font-medium">
                off
              </span>
            </Ribbon>
          </div>
        )}
      </div>

      <div className="p-1 flex flex-col justify-between mt-px h-full">
        <div className="flex items-center justify-between text-sm font-medium font-secondary my-2">
          <IconText
            icon={MapPin}
            text={institution?.location ? institution.location : "World"}
          />
          <IconText icon={Star} text={`${rating}`} />
        </div>
        <Link
          href={`${routes.program}/${slug}`}
          className="block w-fit hover:underline mb-2 hover:text-primary-dark"
        >
          <HeadingText level={6} heading={3}>
            {name}
          </HeadingText>
          <span className="sr-only">View details for {name} program</span>
        </Link>
        {overview && (
          <div
            className="line-clamp-2 text-text-secondary mb-3 text-sm"
            dangerouslySetInnerHTML={{ __html: overview }}
          />
        )}
      </div>
    </div>
  );
};

export default ProgramCard;
