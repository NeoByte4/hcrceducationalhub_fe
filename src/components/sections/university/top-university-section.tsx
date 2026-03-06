import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { routes } from "@/lib/routes";
import ContainerLayout from "../../layouts/container-layout";
import TitleContentBlock from "../../contents/title-content-block";
import ImageCard from "../../cards/university/image-card";

interface DirectusFile {
  id: string;
  filename_download?: string;
  description?: string;
}

interface InstitutionImage {
  directus_files_id: DirectusFile;
}

interface Institution {
  name: string;
  slug: string;
  subtitle?: string;
  overview?: string;
  logo?: { id: string };
  global_ranking?: string | number;
  location?: string;
  images?: InstitutionImage[];
}

interface Props {
  subtitle: string;
  name: string;
  overview: string;
  data: Institution[];
}

const TopUniversitySection: React.FC<Props> = ({
  name,
  subtitle,
  overview,
  data,
}) => {
  return (
    <>
      <ContainerLayout className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
        <TitleContentBlock
          subtitle={subtitle}
          name={name}
          overview={overview}
        />

        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
        >
          <CarouselContent>
            {data.map((item) => (
              <CarouselItem
                key={item.slug}
                className="md:max-h-[30rem] aspect-[3/4] md:aspect-square"
              >
                <ImageCard
                  images={item.images}
                  logo={item.logo}
                  name={item.name}
                  subtitle={item.subtitle}
                  ctaHref={`${routes.university}/${item.slug}`}
                  location={item.location}
                  global_ranking={item.global_ranking}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {data.length > 1 && (
            <>
              <CarouselPrevious className="absolute left-2 top-1/3 -translate-y-1/2 z-10" />
              <CarouselNext className="absolute right-2 top-1/3 -translate-y-1/2 z-10" />
            </>
          )}
        </Carousel>
      </ContainerLayout>
    </>
  );
};

export default TopUniversitySection;
