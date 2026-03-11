import React from "react";
import Link from "next/link";
import Image from "next/image";

import { MapPin } from "lucide-react";
import HeadingText from "@/components/ui/heading-text";
import { IAsset } from "@/src/graphql/generic";
import { getAssetUrl } from "@/src/utils/getAssetUrl";
import StyledButton from "@/components/ui/styled-button";

interface Props {
  location: string;
  image: IAsset;
  href: string;
}

const DestinationCard: React.FC<Props> = ({ location, image, href }) => {
  const img = getAssetUrl(image);

  return (
    <div className="h-full overflow-hidden rounded-lg relative group/destCard">
      <Link aria-label={`Navigate to ${location} details page`} href={href}>
        <Image
          src={img.src}
          alt={img.alt ?? ""}
          width={300}
          height={300}
          className="w-full h-full object-cover"
          quality={75}
          unoptimized={true}
        />

        <div className="absolute inset-0 p-3 bg-black/20 group-hover/destCard:bg-black/30 transition-all">
          <div className="flex h-full items-end justify-between">
            <HeadingText
              aria-label={`Navigate to ${location} details page`}
              level={6}
              heading={3}
            >
              <StyledButton variant="secondary" icon={MapPin}>
                {location}
              </StyledButton>
            </HeadingText>

            <StyledButton aria-label={`Navigate to ${location}`} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default DestinationCard;
