import Autoplay from "embla-carousel-autoplay";
import React from "react";
import Link from "next/link";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { IAsset } from "@/src/graphql/generic";
import { getAssetUrl } from "@/src/utils/getAssetUrl";
import ContainerLayout from "../layouts/container-layout";
import { Button } from "@/components/ui/button";

interface SlideshowItem {
  directus_files_id: IAsset;
}

interface Props {
  image?: IAsset;
  subtitle?: string;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  ctaTitle?: string;
  video?: IAsset;
  ctaHref?: string;
  overlayOpacity?: "light" | "medium" | "dark";
  height?: "small" | "medium" | "large";
  slideshowImages?: SlideshowItem[];
  logo?: IAsset;
  global_ranking?: string;
}

const HeroSection: React.FC<Props> = ({
  image,
  title,
  description,
  children,
  video,
  className = "",
  ctaTitle,
  ctaHref,
  height = "medium",
  slideshowImages,
  global_ranking,
  logo,
}) => {
  const heightClasses = {
    small: "h-[40vh] md:h-[50vh]",
    medium: "h-[60vh] md:h-[70vh]",
    large: "h-[70vh] md:h-[85vh]",
  };

  const img = getAssetUrl(image);

  return (
    <ContainerLayout className={`pt-4 md:pt-0 ${className}`}>
      <section
        className={`relative w-full ${heightClasses[height]} max-h-[700px] rounded-lg`}
      >
        {slideshowImages && slideshowImages.length > 0 ? (
          <div className="absolute w-full inset-0 overflow-hidden rounded-lg">
            {slideshowImages.length === 1 ? (
              // ── SINGLE IMAGE: static, no carousel ──
              <Image
                src={getAssetUrl(slideshowImages[0].directus_files_id).src}
                alt={
                  getAssetUrl(slideshowImages[0].directus_files_id).alt ??
                  `Hero image for ${title}`
                }
                width={1600}
                height={900}
                className="object-cover rounded-lg w-full h-full"
                sizes="100vw"
                quality={100}
                priority
              />
            ) : (
              // ── MULTIPLE IMAGES: carousel with slide ──
              <Carousel
                opts={{ loop: true, duration: 35 }}
                plugins={[Autoplay({ delay: 4000 })]}
                className="w-full h-full"
              >
                <CarouselContent className="-ml-0">
                  {slideshowImages.map((image, idx) => {
                    const img = getAssetUrl(image.directus_files_id);
                    return (
                      <CarouselItem
                        key={img.src}
                        className="relative h-full basis-full pl-0"
                      >
                        <Image
                          src={img.src}
                          alt={
                            img.alt ?? `Carousel image ${idx + 1} for ${title}`
                          }
                          width={1600}
                          height={900}
                          className="object-cover rounded-lg w-full h-full"
                          sizes="100vw"
                          quality={75}
                          priority={idx === 0}
                        />
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
              </Carousel>
            )}
          </div>
        ) : video ? (
          <div className="absolute inset-0 overflow-hidden rounded-lg">
            <video
              className="w-full h-full object-cover rounded-lg"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src={getAssetUrl(video).src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
          <Image
            fill
            src={img.src}
            alt={img.alt ?? "Alt Image"}
            className="object-cover rounded-lg"
            sizes="100vw"
            quality={100}
            priority
            fetchPriority="high"
          />
        )}
        {logo && (
          <div className="absolute top-4 left-4 z-50 w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-lg bg-white">
            <Image
              width={64}
              height={64}
              src={getAssetUrl(logo).src}
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {global_ranking && (
          <div className="absolute top-4 right-4 z-50 bg-black/40 backdrop-blur-sm text-white text-sm font-semibold px-3 py-1.5 rounded-full border border-white/30 shadow">
            🏆Global Rank : {global_ranking}
          </div>
        )}

        {/* <div className={`absolute inset-0 ${overlayClasses[overlayOpacity]} rounded-lg`} /> */}

        <div className="relative z-50 h-full flex flex-col justify-center">
          <ContainerLayout size="sm" className="text-center">
            <h1 className="text-white font-bold text-3xl md:text-5xl lg:text-6xl mb-6 leading-[1.15] font-secondary max-w-4xl mx-auto drop-shadow-md">
              {title}
            </h1>

            {description && (
              <div className="text-white/90 text-base sm:text-lg md:text-xl font-normal mb-8 max-w-3xl mx-auto leading-relaxed line-clamp-6">
                {description}
              </div>
            )}

            {ctaTitle && ctaHref && (
              <Link href={ctaHref} className="inline-block">
                <Button
                  size="lg"
                  className="bg-white/10 backdrop-blur-lg hover:bg-white/20 text-white border border-white/30 hover:border-white/50 transition-all duration-300"
                >
                  {ctaTitle}
                </Button>
              </Link>
            )}
          </ContainerLayout>
        </div>

        {children}
      </section>
    </ContainerLayout>
  );
};

export default HeroSection;
