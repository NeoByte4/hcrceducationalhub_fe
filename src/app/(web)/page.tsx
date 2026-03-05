import React from "react";
import { axiosDataInstance } from "../../axios/axios";
import HeroSection from "../../components/sections/tours/hero-section";
import GobalDestinationSearch from "@/src/components/forms/global-destination-search";
import SpacingLayout from "@/src/components/layouts/spacing-layout";
import { shouldRenderSection } from "@/src/utils/should-render-section";
import TopDestinationSection from "@/src/components/sections/top-destination-section";

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
}`;

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
    </>
  );
};

export default Homepage;
