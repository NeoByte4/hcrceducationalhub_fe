import { cn } from "@/lib/utils";
import Link from "next/link";

interface StepCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  index: number;
  isLast?: boolean;
  link?: string;
}

const StepCard: React.FC<StepCardProps> = ({
  title,
  subtitle,
  icon,
  index,
  isLast = false,
  link,
}) => {
  const cardContent = (
    <div className="relative flex flex-col items-center text-center group px-4 md:px-3 lg:px-2 cursor-pointer">
      {!isLast && (
        <div className="hidden md:flex absolute top-[52px] left-[calc(50%+52px)] w-[calc(100%-104px)] items-center z-0 pointer-events-none">
          <div className="flex-1 h-px bg-divider" />

          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-dark flex items-center justify-center shadow-md z-10">
            <svg
              className="w-3.5 h-3.5 text-on-primary"
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

          <div className="flex-1 h-px bg-divider" />
        </div>
      )}

      <div className="absolute top-0 left-[calc(50%-52px)] w-6 h-6 rounded-full z-20 flex items-center justify-center text-xs font-medium bg-surface-1 border border-divider text-text-secondary shadow-sm font-secondary">
        {index + 1}
      </div>

      <div
        className={cn(
          "relative z-10 mt-3",
          "w-[88px] h-[88px] rounded-2xl",
          "flex items-center justify-center",
          "bg-primary-dark",
          "shadow-sm",
          "transition-all duration-300 ease-out",
          "group-hover:-translate-y-1.5",
          "group-hover:shadow-xl",
        )}
      >
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.12),transparent_70%)]" />

        <div className="relative z-10 text-on-primary group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      </div>

      <div className="mt-5 flex flex-col items-center gap-1.5">
        <h3 className="text-lg font-bold tracking-tight text-text-primary font-secondary">
          {title}
        </h3>

        <p className="text-sm leading-relaxed text-text-secondary max-w-[180px]">
          {subtitle}
        </p>

        <p className="text-sm font-medium text-primary hover:text-primary-light transition-colors font-secondary">
          Read More
        </p>
      </div>
    </div>
  );

  return link ? <Link href={link}>{cardContent}</Link> : cardContent;
};

export default StepCard;
