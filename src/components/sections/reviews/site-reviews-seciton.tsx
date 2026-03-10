import { routes } from "@/lib/routes";
import Link from "next/link";
import StyledButton from "@/components/ui/styled-button";
import { reviews } from "@/src/data/reviews";
import ContainerLayout from "../../layouts/container-layout";
import TitleContentBlock from "../../contents/title-content-block";
import ReviewCard from "../../cards/reviews-card";

interface props {
  subtitle?: string;
  title?: string;
  description?: string;
}

const SiteReviewSection: React.FC<props> = ({
  subtitle = "Student Testimonials",
  title = "What Our Students and Partners Say",
  description = "From aspiring students to our trusted education partners, their experiences reflect the guidance, support, and dedication that define every journey with our consultancy.",
}) => {
  const currentItems = reviews.slice(0, 6);

  return (
    <div className="relative my-80 sm:my-16">
      <ContainerLayout>
        <TitleContentBlock
          subtitle={subtitle}
          name={title}
          overview={description}
          isCenter={true}
        />
      </ContainerLayout>

      <ContainerLayout className="relative mt-12">
        <div className="hidden md:block absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-bg/80 via-bg/50 to-transparent" />

        <section className="columns-1 md:columns-2 lg:columns-3 gap-5">
          {currentItems.map((review) => (
            <div key={review.id} className="mb-5 break-inside-avoid">
              <ReviewCard {...review} />
            </div>
          ))}
        </section>
      </ContainerLayout>

      <ContainerLayout className="mt-6">
        <p className="sm:max-w-xl text-xs text-text-secondary text-center mx-auto">
          The testimonials displayed here are sample reviews created to
          illustrate the type of feedback we receive from students and partners.
          This section will be updated soon with real experiences from students
          who have pursued their international education through our
          consultancy.
        </p>
      </ContainerLayout>

      <ContainerLayout className="grid place-items-center mt-6">
        <Link href={routes.reviews}>
          <StyledButton>Show More Reviews</StyledButton>
        </Link>
      </ContainerLayout>
    </div>
  );
};

export default SiteReviewSection;
