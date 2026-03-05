import React from "react";

import Link from "next/link";

interface Props {
  title: string;
  description: string | React.ReactNode;
  subtitle?: string;
  ctaTitle?: string;
  ctaLink?: string;
  isCenter?: boolean;
}

const BannerContentBlock: React.FC<Props> = ({
  title,
  description,
  subtitle,
  ctaTitle,
  ctaLink,
  isCenter = true,
}) => {
  return (
    <>
      <div className={`${isCenter && "text-center max-w-3xl mx-auto"}`}>
        {subtitle && (
          <span className="inline-block bg-white rounded-md px-4 py-2 text-xs font-medium text-text-primary  mb-6">
            {subtitle}
          </span>
        )}
        <h2 className="text-4xl md:text-5xl font-bold mb-4 font-secondary text-white">
          {title}
        </h2>

        <div className="text-lg md:text-lg text-white">{description}</div>

        {ctaLink && ctaTitle && (
          <Link className="block mt-4" href={ctaLink}>
            <button className="bg-white/50 backdrop-blur-2xl text-bg text-base font-bold py-2 px-4 rounded-md">
              {ctaTitle}
            </button>
          </Link>
        )}
      </div>
    </>
  );
};

export default BannerContentBlock;
