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

import ContainerLayout from "../../layouts/container-layout";
import TitleContentBlock from "../../contents/title-content-block";
import CourseCard from "../../cards/course/course-card";
import { ICourse } from "@/src/graphql/types_api";

interface Props {
  subtitle?: string;
  title: string;
  description: string;
  data: ICourse[];
}

const LatestCourseSection: React.FC<Props> = ({
  title,
  subtitle,
  description,
  data,
}) => {
  return (
    <ContainerLayout className="my-20">
      <Carousel
        opts={{
          align: "start",
          slidesToScroll: 1,
        }}
      >
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <TitleContentBlock
            name={title}
            subtitle={subtitle}
            overview={description}
          />

          <div className="flex items-end justify-end gap-3 relative">
            <Link href={routes.blog}>
              <StyledButton>View All Course</StyledButton>
            </Link>

            <CarouselPrevious />
            <CarouselNext />
          </div>
        </div>

        <CarouselContent className="pl-2">
          {data?.map((course, index) => (
            <CarouselItem
              key={index}
              className="basis-full sm:basis-1/2 md:basis-1/3"
            >
              <CourseCard
                title={course.title}
                slug={course.slug}
                description={course.description}
                banner_image={course.banner_image}
                highlights={course.highlights}
                discound={course.discound}
                duration={course.duration}
                level={course.level}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </ContainerLayout>
  );
};

export default LatestCourseSection;
