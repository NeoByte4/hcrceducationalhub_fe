import Link from "next/link";
import { Button } from "@/components/ui/button";
import HeadingText from "@/components/ui/heading-text";

interface Props {
  title: string;
  description?: string | React.ReactNode;
  subtitle?: string;
  ctaTitle?: string;
  titleClass?: string;
  ctaLink?: string;
  isCenter?: boolean;
}

function TitleContentBlock({
  title,
  description,
  ctaTitle,
  ctaLink,
  titleClass,
  isCenter = false,
}: Props) {
  return (
    <div className={`${isCenter ? "text-center max-w-3xl mx-auto" : ""}`}>
      <HeadingText level={2} className={`mb-2 md:mb-4 ${titleClass}`}>
        {title}
      </HeadingText>

      {description &&
        (typeof description === "string" ? (
          <div
            className="text-lg md:text-lg text-text-secondary rich_text_container"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        ) : (
          <div className="text-lg md:text-lg text-text-secondary">
            {description}
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
