import Link from "next/link";
import { Button } from "@/components/ui/button";
import HeadingText from "@/components/ui/heading-text";

interface Props {
  name: string;
  subtitle?: string;
  overview?: string;
  ctaTitle?: string;
  ctaLink?: string;
  isCenter?: boolean;
}

function TitleContentBlock({
  name,
  overview,
  ctaTitle,
  ctaLink,

  isCenter = false,
}: Props) {
  return (
    <div className={`${isCenter ? "text-center max-w-3xl mx-auto" : ""}`}>
      <HeadingText
        level={2}
        className={`mb-2 md:mb-4 ${isCenter ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl"}`}
      >
        {name}
      </HeadingText>

      {overview &&
        (typeof overview === "string" ? (
          <div
            className="text-lg md:text-lg text-text-secondary rich_text_container"
            dangerouslySetInnerHTML={{ __html: overview }}
          />
        ) : (
          <div className="text-lg md:text-lg text-text-secondary">
            {overview}
          </div>
        ))}

      {ctaLink && ctaTitle && (
        <Link className="block mt-4" href={ctaLink}>
          <Button>{ctaTitle}</Button>
        </Link>
      )}
    </div>
  );
}

export default TitleContentBlock;
