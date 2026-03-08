"use client";

import ContainerLayout from "../layouts/container-layout";
import { IDestination_MINIMAL } from "@/src/graphql/types_api";
import TitleContentBlock from "../contents/title-content-block";
import DestinationCard from "../cards/destination/destination-card";
import { routes } from "@/lib/routes";

const spanPatterns = [
  "sm:col-span-2 lg:col-span-2",
  "lg:col-span-1",
  "lg:col-span-2",
  "hidden sm:block sm:col-span-2 lg:col-span-1",
  "hidden sm:block lg:col-span-2",
  "hidden sm:block lg:col-span-2",
];

interface Props {
  subtitle: string;
  name: string;
  overview: string;
  data: IDestination_MINIMAL[];
}

const TopDestinationSection: React.FC<Props> = ({
  subtitle,
  name,
  overview,
  data,
}) => {
  return (
    <div>
      <ContainerLayout className="mb-8">
        <TitleContentBlock
          subtitle={subtitle}
          name={name}
          overview={overview}
          isCenter
        />
      </ContainerLayout>

      <ContainerLayout className="bg-surface-1 p-4 rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 auto-rows-[340px]">
          {data.map((country, index) => (
            <div
              key={country.slug}
              className={spanPatterns[index % spanPatterns.length]}
            >
              <DestinationCard
                location={country.name}
                image={country.images[1]?.directus_files_id}
                href={`${routes.country}/${country.slug}`}
              />
            </div>
          ))}
        </div>
      </ContainerLayout>
    </div>
  );
};

export default TopDestinationSection;
