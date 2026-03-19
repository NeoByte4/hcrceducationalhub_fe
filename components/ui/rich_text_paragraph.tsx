import React from "react";
import SubHeadingText from "@/components/ui/sub-heading-text";

interface RichTextSectionProps {
  title: string;
  content?: string | null;
}

const RichTextSection: React.FC<RichTextSectionProps> = ({
  title,
  content,
}) => {
  if (!content) return null;

  return (
    <div className="mt-6">
      <SubHeadingText>{title}</SubHeadingText>
      <div
        className="rich_text_container"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default RichTextSection;
