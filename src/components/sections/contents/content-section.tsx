import HeadingText from "@/components/ui/heading-text";
import React from "react";

interface Props {
  title: string;
  text?: string;
  htmlContent?: string;
}

const ContentSection: React.FC<Props> = ({ title, text, htmlContent }) => {
  if (!text && !htmlContent) return null;

  return (
    <section className="mb-8">
      <HeadingText level={3} heading={2} className="mb-3">
        {title}
      </HeadingText>

      {text && <div className="text-text-secondary mb-2">{text}</div>}

      {htmlContent && (
        <div
          className="rich_text_container text-text-secondary"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        ></div>
      )}
    </section>
  );
};

export default ContentSection;
