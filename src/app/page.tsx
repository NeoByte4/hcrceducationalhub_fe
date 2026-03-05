import React from "react";
import { axiosDataInstance } from "../axios/axios";
import HeroSection from "../components/sections/tours/hero-section";

const HERO_QUERY = `
query {
  hero_page {
    id
    title
    video { id }
  }
}
`;

const fetchHeroData = async () => {
  const response = await axiosDataInstance.post("/graphql", {
    query: HERO_QUERY,
  });

  return response.data.data.hero_page[0];
};

const Homepage = async () => {
  const hero_page = await fetchHeroData();

  const { title = "", video } = hero_page ?? {};

  return (
    <HeroSection
      title={title}
      video={video}
      image={{ id: "" }}
      height="large"
      ctaHref="/tours"
    />
  );
};

export default Homepage;
