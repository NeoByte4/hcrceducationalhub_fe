import { LucideIcon } from "lucide-react";
import React from "react";

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  text: string;
  label?: string;
  icon: LucideIcon;
  iconSize?: number;
  iconClass?: string;
}

const IconText = ({
  icon: Icon,
  iconSize = 16,
  text,
  label,
  className,
  iconClass,
}: Props) => {
  const mergedClasses = `flex items-center gap-px ${className}`;

  return (
    <div className={mergedClasses}>
      <Icon size={iconSize} className={iconClass} />{" "}
      {label && (
        <span className="font-medium ml-1 mr-2 text-text-primary">
          {label}:{" "}
        </span>
      )}
      {text}
    </div>
  );
};

export default IconText;
