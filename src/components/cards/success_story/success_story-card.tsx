import Image from "next/image";
import Link from "next/link";
import { getAssetUrl } from "@/src/utils/getAssetUrl";
import HeadingText from "@/components/ui/heading-text";
import StyledButton from "@/components/ui/styled-button";
import HighlightText from "@/components/ui/highlite-text";
import { ISuccessStory } from "@/src/graphql/types_api";
import { routes } from "@/lib/routes";
import { GraduationCap, MapPin, Star } from "lucide-react";

interface Props {
  story: ISuccessStory;
}

const SuccessStoryCard: React.FC<Props> = ({ story }) => {
  const {
    student_name,
    slug,
    country,
    university,
    course_taken,
    score,
    admission_year,
    image,
  } = story;

  const mainImage = image?.[0]?.directus_files_id;
  const bgImage = mainImage
    ? getAssetUrl(mainImage)
    : { src: "/placeholder.jpg", alt: `Photo of ${student_name}` };

  return (
    <div className="relative rounded-lg overflow-hidden w-full aspect-square h-full group/card">
      <Image
        width={450}
        height={450}
        src={bgImage.src}
        className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
        alt={bgImage.alt ?? `Photo of ${student_name}`}
      />

      <Image
        width={450}
        height={450}
        src={bgImage.src}
        className="w-full h-full object-cover blur-sm absolute inset-0 opacity-40"
        alt=""
        aria-hidden="true"
      />

      {score && score !== "N/A" && (
        <div className="absolute top-4 right-4 z-20">
          <HighlightText>
            <Star size={12} className="inline mr-1" />
            {score}
          </HighlightText>
        </div>
      )}

      {admission_year && (
        <div className="absolute top-4 left-4 z-20">
          <HighlightText>{admission_year}</HighlightText>
        </div>
      )}

      <div className="absolute inset-0 bg-black/30 p-3 flex flex-col justify-end">
        <div className="h-fit bg-black/30 backdrop-blur-xl transition-all rounded-lg p-2">
          <HeadingText level={0} heading={3} className="text-bg mb-2">
            {student_name}
          </HeadingText>

          <div className="flex items-center gap-1 text-primary-foreground/85 text-sm mb-1">
            <GraduationCap size={14} className="shrink-0" />
            <span className="line-clamp-1">{university}</span>
          </div>

          <div className="flex items-center gap-1 text-primary-foreground/85 text-sm mb-1">
            <MapPin size={14} className="shrink-0" />
            <span>{country}</span>
          </div>

          {course_taken && (
            <p className="text-primary-foreground/70 text-xs mt-1 italic line-clamp-1">
              {course_taken}
            </p>
          )}

          <div className="flex justify-end mt-4">
            <Link
              href={`${routes.successStory}/${slug}`}
              aria-label={`Read ${student_name}'s success story`}
              className="z-10"
            >
              <StyledButton variant="secondary">Read Story</StyledButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessStoryCard;
