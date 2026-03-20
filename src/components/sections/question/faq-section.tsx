import { IFaq } from "@/src/graphql/types_api";
import React from "react";
import TitleContentBlock from "../../contents/title-content-block";
import ContainerLayout from "../../layouts/container-layout";
import { Accordion } from "@radix-ui/react-accordion";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface props {
  data?: IFaq[];
  name?: string;
}

const FaqSection: React.FC<props> = ({ data, name }) => {
  if (!data) return null;

  return (
    <section>
      <TitleContentBlock
        name="Frequently Asked Questions"
        overview={`Explore frequently asked questions about studying in ${name}, including universities, admissions, visas, and student life.`}
        isCenter={true}
      />

      <ContainerLayout className="mt-12">
        <Accordion type="single" collapsible className="flex flex-col gap-3">
          {data.map((item, idx) => (
            <AccordionItem
              key={idx}
              value={`item-${idx + 1}`}
              className="bg-surface rounded-xl border border-surface p-1 md:p-2 min-h-0"
            >
              <AccordionTrigger className="text-base md:text-lg font-bold px-2 py-2 min-h-0 font-secondary">
                {item.question}
              </AccordionTrigger>

              <AccordionContent className="px-3 pb-2 text-sm md:text-base text-text-secondary">
                <div dangerouslySetInnerHTML={{ __html: item.answer }}></div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ContainerLayout>
    </section>
  );
};

export default FaqSection;
