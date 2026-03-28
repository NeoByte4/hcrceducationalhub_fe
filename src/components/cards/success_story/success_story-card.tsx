import Image from "next/image";
import Link from "next/link";
import { getAssetUrl } from "@/src/utils/getAssetUrl";
import HeadingText from "@/components/ui/heading-text";
import { Button } from "@/components/ui/button";
import { ISuccessStory } from "@/src/graphql/types_api";
import { routes } from "@/lib/routes";
import {
  GraduationCap,
  MapPin,
  BookOpen,
  Calendar,
  ArrowUpRight,
  Star,
} from "lucide-react";

interface SuccessStoryCardProps {
  story: ISuccessStory;
  className?: string;
}

const SuccessStoryCard: React.FC<SuccessStoryCardProps> = ({
  story,
  className = "",
}) => {
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
  const bgImage = getAssetUrl(mainImage);

  return (
    <div
      className={`group/card bg-white border border-border-first rounded-2xl overflow-hidden hover:border-primary-dark/30 hover:shadow-xl transition-all duration-300 flex flex-col h-full ${className}`}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <Link href={`${routes.successStory}/${slug}`} className="block h-full">
          <Image
            src={bgImage.src}
            alt={bgImage.alt || student_name || "Success story"}
            fill
            className="object-cover group-hover/card:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>

        {score && (
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-xs font-semibold text-primary-dark px-3.5 py-1.5 rounded-xl shadow-sm capitalize">
            {score}
          </div>
        )}

        {admission_year && (
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm flex items-center gap-1.5 text-xs font-medium text-text-secondary px-3 py-1.5 rounded-xl shadow-sm">
            <Calendar className="w-3.5 h-3.5" />
            <span>Class of {admission_year}</span>
          </div>
        )}
      </div>

      <div className="flex-1 p-5 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <Link
            href={`${routes.successStory}/${slug}`}
            className="block group-hover/card:text-primary-dark transition-colors"
          >
            <HeadingText
              level={5}
              className="line-clamp-1 leading-tight text-text-primary"
            >
              {student_name || "Student"}
            </HeadingText>
          </Link>

          {score && (
            <div className="flex items-center gap-1 text-warning">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-semibold text-text-primary">
                {score}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-start gap-2 text-text-secondary text-sm mb-2">
          <GraduationCap className="w-4 h-4 text-text-disabled shrink-0 mt-0.5" />
          <span className="line-clamp-1">
            {university || "University not specified"}
          </span>
        </div>

        {course_taken && (
          <div className="flex items-start gap-2 text-text-secondary text-sm mb-5">
            <BookOpen className="w-4 h-4 text-text-disabled shrink-0 mt-0.5" />
            <span className="line-clamp-2 italic">{course_taken}</span>
          </div>
        )}

        <div className="mt-auto grid grid-cols-2 gap-4 text-sm pt-4 border-t border-divider">
          <div>
            <p className="font-semibold text-text-primary capitalize">
              {university || "University"}
            </p>
            <div className="flex items-center gap-1.5 text-text-disabled text-xs mt-1">
              <MapPin className="w-3.5 h-3.5" />
              <span className="capitalize line-clamp-1">
                {country || "Location not specified"}
              </span>
            </div>
          </div>

          <div>
            <p className="font-semibold text-text-primary">
              {admission_year ? `Class of ${admission_year}` : "Year N/A"}
            </p>
            {course_taken && (
              <p className="text-xs text-text-disabled mt-1 line-clamp-1">
                {course_taken}
              </p>
            )}
          </div>
        </div>

        <Link
          href={`${routes.successStory}/${slug}`}
          className="mt-6 block"
          aria-label={`Read success story of ${student_name}`}
        >
          <Button className="w-full bg-bg-btn hover:bg-primary-dark transition-colors">
            Read Story
            <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover/card:translate-x-0.5" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessStoryCard;
