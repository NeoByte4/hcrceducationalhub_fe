import Image from "next/image";
import Link from "next/link";
import { getAssetUrl } from "@/src/utils/getAssetUrl";
import HeadingText from "@/components/ui/heading-text";
import StyledButton from "@/components/ui/styled-button";
import HighlightText from "@/components/ui/highlite-text";

interface DirectusFile {
  id: string;
  filename_download?: string;
  description?: string;
}

interface InstitutionImage {
  directus_files_id: DirectusFile;
}

interface Props {
  name: string;
  subtitle?: string;
  ctaHref: string;
  location?: string;
  global_ranking?: string | number;
  images?: InstitutionImage[];
  logo?: { id: string };
}

const ImageCard: React.FC<Props> = ({
  name,
  subtitle,
  ctaHref,
  location,
  global_ranking,
  images,
  logo,
}) => {
  const mainImage = images?.[0]?.directus_files_id;
  const bgImage = mainImage
    ? getAssetUrl(mainImage)
    : { src: "/placeholder.jpg", alt: `Background for ${name}` };

  const logoImage = logo ? getAssetUrl(logo) : null;

  return (
    <div className="relative rounded-lg overflow-hidden w-full aspect-square h-full group/card">
      <Image
        width={450}
        height={450}
        src={bgImage.src}
        className="w-full h-full object-cover"
        alt={bgImage.alt ?? `Image for ${name}`}
      />
      <Image
        width={450}
        height={450}
        src={bgImage.src}
        className="w-full h-full object-cover blur-sm absolute inset-0 opacity-50"
        alt=""
        aria-hidden="true"
      />
      {logoImage && (
        <div className="absolute top-4 left-4 z-20 w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-lg bg-white">
          <Image
            width={64}
            height={64}
            src={logoImage.src}
            alt={`${name} logo`}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      {global_ranking && (
        <div className="absolute top-4 right-4 z-20">
          <HighlightText>Rank: {global_ranking}</HighlightText>
        </div>
      )}
      <div className="absolute inset-0 bg-black/30 p-3 flex flex-col justify-end">
        <div className="h-fit bg-black/30 backdrop-blur-xl transition-all rounded-lg p-4">
          <HeadingText level={0} heading={3} className="text-bg mb-2">
            {name} || {location}
          </HeadingText>
          <p className="text-primary-foreground/85 text-sm md:text-base line-clamp-3">
            {subtitle ||
              location ||
              (global_ranking ? `Rank: ${global_ranking}` : "")}
          </p>
          {ctaHref && (
            <div className="flex justify-end mt-4">
              <Link
                href={ctaHref}
                aria-label={`Learn more about ${name}`}
                className="z-10"
              >
                <StyledButton variant="secondary">Learn more</StyledButton>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
