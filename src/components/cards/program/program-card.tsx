import Image from "next/image";
import Link from "next/link";
import { IInstitution, IProgram } from "@/src/graphql/types_api";
import { getAssetUrl } from "@/src/utils/getAssetUrl";
import Ribbon from "../../primitives/ribbon";
import { routes } from "@/lib/routes";
import { ArrowUpRight, MapPin, Star } from "lucide-react";
import HeadingText from "@/components/ui/heading-text";
import { Button } from "@/components/ui/button";

interface ProgramCardProps {
  program: IProgram;
  discount?: number;
  institution_name?: string;
  logo?: IInstitution["logo"];
  location?: IInstitution["location"];
}

const ProgramCard: React.FC<ProgramCardProps> = ({
  program,
  institution_name,
  logo,
  location,
}) => {
  const {
    name,
    slug,
    subtitle,
    duration,
    program_level,
    credits_hours,
    images,
    discount,
    rating = 2.4,
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
    : logo?.id
      ? `${DIRECTUS_URL}/assets/${logo.id}`
      : "/placeholder.jpg";

  const institutionName =
    institution?.name || institution_name || "Institution";

  return (
    <div className="group/card bg-white border border-border-first rounded-2xl overflow-hidden hover:border-primary-dark/30 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Image Section */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <Link href={`${routes.program}/${slug}`} className="block h-full">
          <Image
            src={bgImage.src}
            alt={bgImage.alt}
            fill
            className="object-cover group-hover/card:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>

        {/* Level Badge */}
        {program_level && (
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-xs font-semibold text-primary-dark px-3.5 py-1.5 rounded-xl shadow-sm capitalize">
            {program_level}
          </div>
        )}

        {/* Discount Ribbon */}
        {shouldShowDiscount && (
          <Ribbon className="absolute top-4 right-4">
            <span className="text-lg font-extrabold text-white tracking-tight">
              {discount}%
            </span>
            <span className="block -mt-1 text-[10px] font-medium text-white/90">
              OFF
            </span>
          </Ribbon>
        )}
      </div>

      {/* Content Section */}
      <div className="flex-1 p-5 flex flex-col">
        {/* Institution Info + Rating */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg overflow-hidden border border-border-light flex-shrink-0">
              <Image
                src={logoSrc}
                alt={institutionName}
                width={36}
                height={36}
                className="object-cover"
              />
            </div>
            <p className="text-sm font-medium text-text-secondary line-clamp-1">
              {institutionName}
            </p>
          </div>

          {rating && (
            <div className="flex items-center gap-1 text-warning">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-semibold text-text-primary">
                {rating.toFixed(1)}
              </span>
            </div>
          )}
        </div>

        {/* Program Name */}
        <Link
          href={`${routes.program}/${slug}`}
          className="block group-hover/card:text-primary-dark transition-colors"
        >
          <HeadingText
            level={5}
            className="line-clamp-2 leading-tight mb-2 text-text-primary"
          >
            {name}
          </HeadingText>
        </Link>

        {/* Subtitle */}
        {subtitle && (
          <div
            className="text-sm text-text-secondary line-clamp-2 mb-5 rich_text_container"
            dangerouslySetInnerHTML={{ __html: subtitle }}
          />
        )}

        {/* Meta Information */}
        <div className="mt-auto grid grid-cols-2 gap-4 text-sm pt-4 border-t border-divider">
          <div>
            <p className="font-semibold text-text-primary">
              {duration || "N/A"}
            </p>
            <div className="flex items-center gap-1.5 text-text-disabled text-xs mt-1">
              <MapPin className="w-3.5 h-3.5" />
              <span className="capitalize line-clamp-1">
                {location || "Location not specified"}
              </span>
            </div>
          </div>

          <div>
            <p className="font-semibold text-text-primary capitalize">
              {program_level || "Program"}
            </p>
            {credits_hours && (
              <p className="text-xs text-text-disabled mt-1">
                {credits_hours} Credits
              </p>
            )}
          </div>
        </div>

        <Link
          href={`${routes.program}/${slug}`}
          className="mt-6 block"
          aria-label={`View details for ${name} program`}
        >
          <Button className="w-full bg-bg-btn hover:bg-primary-dark transition-colors">
            View Program
            <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover/card:translate-x-0.5" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProgramCard;
