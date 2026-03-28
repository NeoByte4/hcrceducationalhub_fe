import { ISuccessStory } from "@/src/graphql/types_api";
import ContainerLayout from "../../layouts/container-layout";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import TitleContentBlock from "../../contents/title-content-block";
import Link from "next/link";
import StyledButton from "@/components/ui/styled-button";
import { routes } from "@/lib/routes";
import SuccessStoryCard from "../../cards/success_story/success_story-card";

interface Props {
  data: ISuccessStory[];
}

const SuccessStorySection: React.FC<Props> = ({ data }) => {
  return (
    <ContainerLayout className="my-20">
      <div className="relative">
        <Carousel
          opts={{
            align: "start",
            slidesToScroll: 1,
            loop: true,
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <TitleContentBlock
              name="Success Stories & Testimonials"
              subtitle="Real Experiences from Real Students"
              overview="Every success story represents a dream fulfilled. At HCRC Educational Hub, our students share how expert guidance, personalized counseling, and strong preparation helped them achieve high IELTS and PTE scores and secure admissions abroad."
            />

            <div className="flex items-end justify-end">
              <Link href={routes.course}>
                <StyledButton>View All Courses</StyledButton>
              </Link>
            </div>
          </div>
          <div className="relative">
            <CarouselContent className="pl-2">
              {data?.map((story, index) => (
                <CarouselItem
                  key={story.slug ?? index}
                  className="pl-2 basis-[85%] sm:basis-[60%] md:basis-[40%] lg:basis-[30%]"
                >
                  <SuccessStoryCard story={story} />
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="!absolute -left-10 top-1/2 -translate-y-1/2 z-20" />
            <CarouselNext className="!absolute -right-10 top-1/2 -translate-y-1/2 z-20" />
          </div>
        </Carousel>
      </div>
    </ContainerLayout>
  );
};

export default SuccessStorySection;
