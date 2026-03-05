import React from "react";
import clsx from "clsx";
import ContainerLayout from "./container-layout";

interface TwoColumnLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  reversed?: boolean;
  sticky?: boolean;
  className?: string;
  mainClassName?: string;
  sidebarClassName?: string;
}

const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({
  children,
  sidebar,
  reversed = false,
  sticky = true,
  className = "",
  mainClassName = "",
  sidebarClassName = "",
}) => {
  const stickyClass = sticky
    ? "h-fit md:sticky md:top-20 md:right-0 w-full"
    : "";

  const MainSection = (
    <section className={clsx("md:col-span-2 xl:col-span-4", mainClassName)}>
      <div className={stickyClass}>{children}</div>
    </section>
  );

  const SidebarSection = (
    <aside className={clsx("md:col-span-2 xl:col-span-2", sidebarClassName)}>
      <div className={stickyClass}>{sidebar}</div>
    </aside>
  );

  return (
    <ContainerLayout
      className={clsx(
        "grid grid-cols-1 md:grid-cols-4 xl:grid-cols-6 gap-4 xl:gap-6 gap-y-10 relative",
        className,
      )}
    >
      {reversed ? (
        <>
          {SidebarSection} {MainSection}
        </>
      ) : (
        <>
          {MainSection} {SidebarSection}
        </>
      )}
    </ContainerLayout>
  );
};

export default TwoColumnLayout;
