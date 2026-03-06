import Image from "next/image";
import Link from "next/link";
import { IProgram } from "@/src/graphql/types_api";
import { getAssetUrl } from "@/src/utils/getAssetUrl";
import HighlightText from "@/components/ui/highlite-text";
import StyledButton from "@/components/ui/styled-button";
import Ribbon from "../../primitives/ribbon";
import { routes } from "@/lib/routes";
import IconText from "../../primitives/icon-text";
import { ArrowUpRight, MapPin, Star } from "lucide-react";
import HeadingText from "@/components/ui/heading-text";
import { Button } from "@/components/ui/button";

interface ProgramCardProps {
  program: IProgram;
  discount?: number;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program }) => {
  const {
    name,
    slug,
    subtitle,
    overview,
    duration,
    program_level,
    credits_hours,
    images,
    discount,
    rating = 2.4,
    key_highlights,
    institution,
  } = program;
  const shouldShowDiscount = discount != null && discount > 0;
  const mainImage = images?.[0]?.directus_files_id;
  const bgImage = mainImage
    ? getAssetUrl(mainImage)
    : { src: "/placeholder.jpg", alt: name };

  const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL;
  const logoSrc = institution?.logo?.id
    ? `${DIRECTUS_URL}/assets/${institution.logo.id}`
    : null;

  return (
    <div className="bg-bg hover:bg-primary-dark/2 transition-all border rounded-lg p-2 relative flex flex-col h-full group/card">
      <div className="w-full aspect-[1/0.65] max-h-72 relative">
        {program_level && (
          <span className="absolute inset-3 text-xs font-secondary text-primary-dark bg-bg rounded-xl w-fit h-fit px-3 py-1.5 font-semibold capitalize">
            {program_level}
          </span>
        )}
        {shouldShowDiscount && (
          <Ribbon className="text-center">
            <span className="text-[16px] text-white font-extrabold font-secondary">
              {discount}%
            </span>
            <span className="block -mt-[5px] text-xs text-white font-medium">
              off
            </span>
          </Ribbon>
        )}
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
        <Link href={`${routes.program}/${slug}`}></Link>
      </div>
      <div className="p-1 flex flex-col justify-between mt-px h-full">
        <div className="">
          <div className="flex items-center justify-between text-sm font-medium font-secondary my-2">
            <div className="flex items-center gap-2">
              <Image
                src={logoSrc || "/placeholder.jpg"}
                alt={institution?.name || "Institution Logo"}
                width={30}
                height={30}
                className="w-7 h-7 rounded-sm object-cover"
              />

              {institution?.name || "Institution Name"}
            </div>
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

        <div className="">
          <div className="grid grid-cols-2 border-y border-y-primary-dark border-dashed items-center">
            <div className="p-3 border-r border-r-primary-dark border-dashed">
              <p className="font-semibold">{duration} </p>
              <div className="flex items-center flex-wrap gap-1 text-text-secondary mt-2">
                {credits_hours && (
                  <span className="text-xs">{credits_hours} Credits</span>
                )}
              </div>
            </div>

            <div className="p-3 border-r border-r-primary-dark border-dashed">
              <p className="font-semibold">
                {institution?.name || "Institution Name"}
              </p>
              <div className=" flex item-center ">
                <MapPin size={16} />
                <p className="text-text-secondary text-xs capitalize">
                  {institution?.location || "Location"}
                </p>
              </div>
            </div>
          </div>
          <Link
            aria-label={`View details for ${name} program`}
            href={`${routes.program}/${slug}`}
            className="block mt-4"
          >
            <Button className="w-full">
              View Program <ArrowUpRight />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;
