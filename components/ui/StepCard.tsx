// StepCard.tsx
import React from "react";
import { cn } from "@/lib/utils";

interface StepCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  index: number;
  isLast?: boolean;
  link?: {
    text: string;
    href: string;
  };
}

const StepCard: React.FC<StepCardProps> = ({
  title,
  subtitle,
  icon,
  index,
  isLast = false,
  link,
}) => {
  return (
    <div className="relative flex flex-col items-center text-center group px-4 md:px-3 lg:px-2">
      {!isLast && (
        <div className="hidden md:flex absolute top-[52px] left-[calc(50%+52px)] w-[calc(100%-104px)] items-center z-0 pointer-events-none">
          <div className="flex-1 h-px bg-gray-300" />
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center shadow-md z-10">
            <svg
              className="w-3.5 h-3.5 text-white"
              fill="none"
              viewBox="0 0 16 16"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 3l6 5-6 5" />
            </svg>
          </div>
          <div className="flex-1 h-px bg-gray-300" />
        </div>
      )}

      {/* Step number badge */}
      <div
        className="
          absolute top-0 left-[calc(50%-52px)]
          w-6 h-6 rounded-full z-20
          flex items-center justify-center
          text-xs font-medium
          bg-gray-100 border border-gray-300 text-gray-500
          shadow-sm
        "
      >
        {index + 1}
      </div>

      {/* Icon box */}
      <div
        className={cn(
          "relative z-10 mt-3",
          "w-[88px] h-[88px] rounded-2xl",
          "flex items-center justify-center",
          "bg-gray-900",
          "shadow-[0_8px_24px_rgba(0,0,0,0.1)]",
          "transition-all duration-300 ease-out",
          "group-hover:-translate-y-1.5",
          "group-hover:shadow-[0_16px_36px_rgba(0,0,0,0.15)]",
        )}
      >
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.15),transparent_70%)]" />
        <div className="relative z-10 text-white group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      </div>

      {/* Text content */}
      <div className="mt-5 flex flex-col items-center gap-1.5">
        <h3 className="text-sm font-bold tracking-tight text-gray-900">
          {title}
        </h3>
        <p className="text-xs leading-relaxed text-gray-500 max-w-[180px]">
          {subtitle}
        </p>
        {link && (
          <a
            href={link.href}
            className="
              mt-1 inline-flex items-center gap-1
              text-xs font-semibold text-gray-600
              hover:text-gray-900 transition-colors duration-200
              group/link
            "
          >
            {link.text}
            <span className="text-sm transition-transform duration-200 group-hover/link:translate-x-0.5">
              ›
            </span>
          </a>
        )}
      </div>
    </div>
  );
};

export default StepCard;
