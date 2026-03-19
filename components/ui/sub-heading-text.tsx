import clsx from "clsx";
import type { ReactNode, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLHeadingElement | HTMLDivElement> {
  level?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  heading?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
}

const sizeClass: Record<number, string> = {
  0: "text-xs md:text-sm leading-relaxed",
  1: "text-3xl md:text-4xl leading-tight",
  2: "text-2xl md:text-3xl leading-tight",
  3: "text-xl md:text-2xl leading-snug",
  4: "text-lg md:text-xl leading-snug",
  5: "text-base md:text-lg leading-normal",
  6: "text-sm md:text-base leading-normal",
};

const SubHeadingText = ({
  level = 3,
  heading,
  children,
  className = "",
  ...props
}: Props) => {
  const baseStyles = "font-secondary font-semibold";

  const validLevel = (level in sizeClass ? level : 4) as keyof typeof sizeClass;
  const validHeading = (heading ?? level) as keyof typeof sizeClass;

  const size = sizeClass[validLevel];
  const combinedClassName = clsx(className, baseStyles, size);

  const Tag = (validHeading === 0 ? "div" : `h${validHeading}`) as
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "div";

  return (
    <Tag className={combinedClassName} {...props}>
      {children}
    </Tag>
  );
};

export default SubHeadingText;
