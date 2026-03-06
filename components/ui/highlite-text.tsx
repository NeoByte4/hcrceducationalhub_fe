import React from "react";

interface HighlightTextProps {
  children: React.ReactNode;
  className?: string;
}

const HighlightText: React.FC<HighlightTextProps> = ({
  children,
  className = "",
}) => {
  return (
    <span
      className={`inline-block bg-white text-black px-3 py-1 rounded-full text-sm font-semibold ${className}`}
    >
      {children}
    </span>
  );
};

export default HighlightText;
