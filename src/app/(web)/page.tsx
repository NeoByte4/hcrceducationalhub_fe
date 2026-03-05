import React from "react";
import { axiosDataInstance } from "../../axios/axios";
import HeroSection from "../../components/sections/tours/hero-section";
import GobalDestinationSearch from "@/src/components/forms/global-destination-search";

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
  }  
    institutions {
    name
    slug
  }
    program{
    name
    slug
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
  } = data ?? {};

  const heroPage = hero_page[0] ?? {};
  const { title = "", video } = heroPage;
  return (
    <HeroSection
      title={title}
      video={video}
      image={{ id: "" }}
      height="large"
      ctaHref="/tours"
    >
      {" "}
      <div className="absolute z-50 p-3 -translate-x-1/2 left-1/2 w-full -bottom-[45%] sm:bottom-0">
        <GobalDestinationSearch
          country={countries}
          institution={institutions}
          program={program}
        />
      </div>
    </HeroSection>
  );
};

export default Homepage;
