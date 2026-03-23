import { DiamondMinus, DiamondPlus } from "lucide-react";
import React from "react";
import ContainerLayout from "../../layouts/container-layout";

interface props {
  inclusions: string[];
  exclusions: string[];
}

const InclusionsExclusionsSection: React.FC<props> = ({
  inclusions,
  exclusions,
}) => {
  return (
    <ContainerLayout>
      <h2 className="sr-only">Inclusion and Exclusions</h2>

      <section className="bg-primary-dark/5 rounded-xl grid md:grid-cols-2 p-3 gap-3 mt-20">
        <div className="bg-bg rounded-lg px-5 py-4 text-text-secondary">
          <h3 className="text-2xl font-bold flex items-center gap-2 font-secondary mb-2 text-text-primary">
            <DiamondPlus size={24} className="text-primary-dark" />
            Inclusions
          </h3>

          {inclusions && inclusions.length > 0 ? (
            <ul className="list-disc list-inside space-y-1">
              {inclusions.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>Inclusions will be updated shortly.</p>
          )}
        </div>

        <div className="bg-bg rounded-lg px-5 py-4 text-text-secondary">
          <h3 className="text-2xl font-bold flex items-center gap-2 font-secondary mb-2 text-text-primary">
            <DiamondMinus size={24} className="text-primary-dark" />
            Exclusions
          </h3>

          {exclusions && exclusions.length > 0 ? (
            <ul className="list-disc list-inside space-y-1">
              {exclusions.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>Exclusions will be updated shortly.</p>
          )}
        </div>
      </section>
    </ContainerLayout>
  );
};

export default InclusionsExclusionsSection;
