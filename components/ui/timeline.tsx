import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "./badge";

interface TimelineItemProps {
  title: string;
  description: string;
  step: number;
  isLast?: boolean;
}

interface TimelineProps {
  items: Array<{
    title: string;
    description: string;
  }>;
  className?: string;
}

const TimelineItem = React.forwardRef<
  HTMLDivElement,
  TimelineItemProps & React.HTMLAttributes<HTMLDivElement>
>(({ title, description, step, isLast = false, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative flex gap-6 pb-8", className)}
    {...props}
  >
    {!isLast && (
      <div className="absolute left-9 top-8 h-full w-px border border-primary-dark/50" />
    )}

    <Badge
      variant="outline"
      className="relative rounded-lg z-10 bg-background px-3 py-1 text-lg border-2 border-primary-dark font-secondary font-medium h-fit mt-2"
    >
      Step {step}
    </Badge>

    <div className="flex-1  pt-0.5 md:pl-6">
      <h3 className="text-xl font-semibold tracking-tight font-secondary">
        {title}
      </h3>
      <div
        className="text-text-secondary"
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>
    </div>
  </div>
));
TimelineItem.displayName = "TimelineItem";

const Timeline = React.forwardRef<
  HTMLDivElement,
  TimelineProps & React.HTMLAttributes<HTMLDivElement>
>(({ items, className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-6", className)} {...props}>
    {items.map((item, index) => (
      <TimelineItem
        key={index}
        title={item.title}
        description={item.description}
        step={index + 1}
        isLast={index === items.length - 1}
      />
    ))}
  </div>
));
Timeline.displayName = "Timeline";

export { Timeline, TimelineItem };
