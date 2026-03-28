import React from "react";
import { axiosDataInstance } from "../../axios/axios";
import HeroSection from "../../components/sections/hero-section";
import GobalDestinationSearch from "@/src/components/forms/global-destination-search";
import SpacingLayout from "@/src/components/layouts/spacing-layout";
import { shouldRenderSection } from "@/src/utils/should-render-section";
import TopDestinationSection from "@/src/components/sections/top-destination-section";
import TopUniversitySection from "@/src/components/sections/university/top-university-section";
import ProgramListSection from "@/src/components/program/program-list-section";
import { routes } from "@/lib/routes";
import AboutSection from "@/src/components/sections/about/about-section";
import StudyAbroadProcess from "@/src/components/sections/study-abroad/study-abroad-process";
import { studyAbroadProcess } from "@/src/data/study-abroad-process";
import LatestArticleSection from "@/src/components/sections/article/latest-article-section";
import SiteReviewSection from "@/src/components/sections/reviews/site-reviews-seciton";
import NewsletterSection from "@/src/components/sections/newsletter/newsletter-section";
import LatestCourseSection from "@/src/components/sections/course/course-section";

const HERO_QUERY = `
query {
  hero_page {
    id
    title
    video { id }
  }
  countries {
    name
    slug
    images {
      directus_files_id {
        id
        filename_download
        description
      }
    }
  }
  institutions {
    name
    slug
  }
  program {
    name
    slug
  }

  admissionOpenPrograms: program(
    limit: 6
  ) {
    name
    slug
    subtitle
    overview
    duration
    program_level
    credits_hours
    key_highlights
    images {
      directus_files_id {
        id
        filename_download
        description
      }
    }
    institution {
      name
      slug
      logo {
        id
      }
      global_ranking
      location
    }
  }

  topInstitutions: institutions(
    sort: ["global_ranking"],     
    limit: 5,
    filter: { global_ranking: { _nnull: true } }   
  ) {
    name
    slug
    subtitle
    logo { id }
    global_ranking
    location
    images {
      directus_files_id {
        id
        filename_download
        description
      }
    }
  }

    blog {
    title
    slug
    subtitle
    images {
      directus_files_id {
        id
        filename_download
        description
      }
    }
      }

  course {
  title
  slug
  discound
  description
  highlights
  duration
  level
  banner_image {
  directus_files_id {
        id
        filename_download
        description
      }
  }
  }
}
`;

const fetchHeroData = async () => {
  const response = await axiosDataInstance.post("/graphql", {
    query: HERO_QUERY,
  });
  return response.data.data;
};

const Homepage = async () => {
  const data = await fetchHeroData();

  const {
    hero_page = [],
    countries = [],
    institutions = [],
    program = [],
    topCountries = countries,
    topInstitutions = [],
    admissionOpenPrograms = [],
    blog: blogs = [],
    course = [],
  } = data ?? {};

  const heroPage = hero_page[0] ?? {};
  const { title = "", video } = heroPage;

  return (
    <>
      <HeroSection
        title={title}
        video={video}
        image={{ id: "" }}
        height="large"
        ctaHref="/tours"
      >
        <div className="absolute z-50 p-3 -translate-x-1/2 left-1/2 w-full -bottom-[45%] sm:bottom-0">
          <GobalDestinationSearch
            country={countries}
            institution={institutions}
            program={program}
          />
        </div>
      </HeroSection>
      <div className="my-80 sm:my-16"></div>
      <SpacingLayout>
        {shouldRenderSection(topCountries) && (
          <TopDestinationSection
            subtitle=" Explore  most popular countries among our students."
            name="Top Countries"
            overview="Discover the most popular study abroad destinations among our students. Explore top countries for international education and find your perfect study destination."
            data={topCountries}
          />
        )}
      </SpacingLayout>
      {shouldRenderSection(topInstitutions) && (
        <TopUniversitySection
          subtitle="Explore the world's top universities."
          name="Top Universities"
          overview="Discover the world's top universities and their unique offerings. Explore leading institutions for international education and find your perfect academic destination."
          data={topInstitutions}
        />
      )}
      {shouldRenderSection(course) && (
        <LatestCourseSection
          subtitle="Boost Your Future"
          title="Our Popular Courses"
          description="Explore our most popular preparation and counseling courses designed to help you succeed in your study abroad journey."
          data={course}
        />
      )}
      {shouldRenderSection(admissionOpenPrograms) && (
        <ProgramListSection
          subtitle="Curated & Customizable"
          name="Our Recommended  Programs"
          description="These featured tours are selected from our trusted partners' collections, chosen because they capture the essence of Mediterranean travel  collections, chosen because they capture the essence of Mediterranean travel."
          morePlansUrl={routes.program}
          morePlansLabel="See More  Programs"
          data={admissionOpenPrograms}
        />
      )}
      <AboutSection
        subtitle="Why Prestige?"
        name="About Us"
        image="/about/about-1.webp"
        overview={
          <>
            We are an Australian-owned travel wholesaler with over 20 years of
            experience in Mediterranean travel. We create tailor-made packages,
            from private tours and honeymoons to family holidays, leisure
            getaways, and corporate trips.
            <br />
            <br />
            Our services cover everything, accommodation, transfers, ferry and
            train tickets, guided tours, and unique local experiences.
          </>
        }
      />

      <StudyAbroadProcess
        title="HCRC Guide to Studying Abroad"
        data={studyAbroadProcess.data}
      />
      {shouldRenderSection(blogs) && (
        <LatestArticleSection
          subtitle="Latest Blog"
          title="Our Latest Blogs"
          description="Check out our latest blogs on travel and adventure."
          data={blogs}
        />
      )}
      <SiteReviewSection />
      <NewsletterSection />
    </>
  );
};

export default Homepage;
