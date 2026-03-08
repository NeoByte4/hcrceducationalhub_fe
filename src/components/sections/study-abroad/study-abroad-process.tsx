import React from "react";
import {
  UserCheck,
  GraduationCap,
  IdCard,
  Plane,
  LucideIcon,
} from "lucide-react";
import StepCard from "@/components/ui/StepCard";
import ContainerLayout from "../../layouts/container-layout";
import StyledButton from "@/components/ui/styled-button";

const iconMap: Record<string, LucideIcon> = {
  UserCheck,
  GraduationCap,
  IdCard,
  Plane,
};

interface ProcessItem {
  slug: string;
  title: string;
  subtitle: string;
  icon: string;
  link?: { text: string; href: string };
}

interface StudyAbroadProcessProps {
  title: string;
  description?: string;
  data: ProcessItem[];
}

const StudyAbroadProcess: React.FC<StudyAbroadProcessProps> = ({
  title,
  description,
  data,
}) => {
  return (
    <ContainerLayout>
      <div className="flex flex-col my-25 items-center">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
            {title}
          </h2>
          {description && (
            <p className="mt-3 text-base text-gray-500 leading-relaxed">
              {description}
            </p>
          )}
        </div>

        <div className="relative w-full grid grid-cols-1 md:grid-cols-4 gap-y-10 md:gap-x-4 lg:gap-x-6">
          {data.map((item, index) => {
            const Icon = iconMap[item.icon];
            return (
              <StepCard
                key={item.slug}
                index={index}
                title={item.title}
                subtitle={item.subtitle}
                isLast={index === data.length - 1}
                icon={Icon ? <Icon size={36} strokeWidth={1.5} /> : null}
                link={item.link}
              />
            );
          })}
        </div>
        <div className="mt-12">
          <StyledButton>Start Your Journey</StyledButton>
        </div>
      </div>
    </ContainerLayout>
  );
};

export default StudyAbroadProcess;
