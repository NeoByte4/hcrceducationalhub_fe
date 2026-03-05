import Image from "next/image";
import React from "react";
import StyledButton from "@/components/ui/styled-button";
import Link from "next/link";
import { routes } from "@/lib/routes";
import NavItems from "./nav-items";
import MobileMenu from "./mobile-menu";
import ContainerLayout from "../../layouts/container-layout";
import { axiosDataInstance } from "@/src/axios/axios";

const query = `
query {
  countries {
    id
    name 
    slug
  }
  institutions {
    id
    name 
    slug
  }
}
`;

const fetchData = async () => {
  const response = await axiosDataInstance.post("/graphql", {
    query: query,
  });
  return response.data.data;
};

const Header = async () => {
  const data = await fetchData();
  const countries = data.countries ?? [];
  const institutions = data.institutions ?? [];
  console.log(data);
  return (
    <header className="sticky top-0 w-full z-[9001] bg-bg/50 backdrop-blur-xl">
      <ContainerLayout className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 items-center py-2">
        <div className="flex items-center justify-start h-full">
          <Link className="block relative h-16 w-32" href={routes.home}>
            <Image
              src="/hcrc-logo.png"
              alt="Logo for Prestige Travel Corporation"
              className="object-contain"
              sizes="(max-width: 768px) 128px, 160px"
              fill
              priority
            />
          </Link>
        </div>
        <div className="hidden md:col-span-3 md:grid place-items-center">
          <NavItems countries={countries} institutions={institutions} />
        </div>
        <div className="flex items-center justify-end md:hidden">
          <MobileMenu countries={countries} institutions={institutions} />
        </div>
        <div className="hidden lg:flex lg:items-center lg:justify-end">
          <Link href={routes.contact}>
            <StyledButton>Contact Us</StyledButton>
          </Link>
        </div>
      </ContainerLayout>
    </header>
  );
};

export default Header;
