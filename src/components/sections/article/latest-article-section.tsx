import React from "react";
import Link from "next/link";
import StyledButton from "@/components/ui/styled-button";
import { routes } from "@/lib/routes";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { IBlog } from "@/src/graphql/types_api";
import ContainerLayout from "../../layouts/container-layout";
import TitleContentBlock from "../../contents/title-content-block";
import ArticleCard from "../../cards/blogs/blogs-card";

interface props {
  subtitle?: string;
  title: string;
  description: string;
  data: IBlog[];
}

const LatestArticleSection: React.FC<props> = ({
  subtitle,
  title,
  description,
  data,
}) => {
  return (
    <ContainerLayout className="my-80 sm:my-16">
      <Carousel
        opts={{
          align: "start",
          slidesToScroll: 1,
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <TitleContentBlock
            name={title}
            subtitle={subtitle}
            overview={description}
          />

          <div className="flex items-end justify-end">
            <Link href={routes.blog}>
              <StyledButton>View All Blogs</StyledButton>
            </Link>

            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10" />
            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10" />
          </div>
        </div>

        <CarouselContent className="md:gap-6 pl-4 mr-4">
          {data.map((article) => (
            <CarouselItem
              key={article.slug}
              className="basis-[300px] md:basis-[350px] lg:basis-[400px]"
            >
              <ArticleCard
                key={article.slug}
                title={article.title}
                description={article.overview}
                image={article.images}
                date={article.date_created}
                readTime={article.readTime}
                author={"Admin"}
                categories={[]}
                slug={article.slug}
                data={article.blog_content}
                video={article.video}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </ContainerLayout>
  );
};

export default LatestArticleSection;
