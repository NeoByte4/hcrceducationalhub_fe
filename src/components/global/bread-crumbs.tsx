"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

const Breadcrumbs = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <div className="flex flex-wrap items-center space-x-1 text-sm">
      <Link
        href="/"
        className="hover:underline hover:text-brand-primary transition-all"
      >
        Home
      </Link>

      {segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");

        return (
          <div key={href} className="flex items-center gap-1">
            <ChevronRight size={14} />
            <Link
              href={href}
              className="capitalize hover:underline hover:text-brand-primary transition-all"
            >
              {segment.replace(/-/g, " ")}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
