"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import * as Popover from "@radix-ui/react-popover";
import { ISubPage, navLinks } from "@/src/data/navLinks";
import { routes } from "@/lib/routes";

interface Props {
  institutions: ISubPage[];
  countries: ISubPage[];
  onNavigate?: () => void;
}

const NavItems = ({ countries, institutions, onNavigate }: Props) => {
  const dynamicNavLinks = useMemo(() => {
    return navLinks.map((link) => {
      if (link.href === routes.country)
        return { ...link, subPages: institutions };
      if (link.href === routes.university)
        return { ...link, subPages: countries };
      return link;
    });
  }, [countries, institutions]);

  const renderSubPages = (
    mode: string,
    baseHref: string,
    subPages: ISubPage[],
  ) =>
    subPages.map((subPage, i) => (
      <Link
        key={`${subPage.slug ?? subPage.value}-${i}`}
        href={
          mode === "QUERY"
            ? `${baseHref}?activity=${subPage.value}#results`
            : `${baseHref}/${subPage.slug}`
        }
        onClick={onNavigate}
        className="block text-sm lg:text-base px-4 py-2 rounded hover:bg-bg transition line-clamp-2"
      >
        {subPage.name}
      </Link>
    ));

  return (
    <nav className="flex flex-col gap-2 md:flex-row md:items-center md:gap-1 lg:gap-2 md:py-1 md:px-4 md:border md:border-surface-2 md:rounded-lg md:bg-bg/75 md:backdrop-blur-xl">
      {dynamicNavLinks.map((navItem) => {
        const hasSubPages = navItem.subPages && navItem.subPages.length > 0;

        return (
          <div key={navItem.href} className="relative group">
            <Link
              href={navItem.href}
              onClick={onNavigate}
              className={`text-sm lg:text-base transition-all font-medium py-2 px-4 hidden md:flex items-center justify-between hover:text-primary-dark ${
                hasSubPages ? "md:justify-center" : ""
              }`}
            >
              {navItem.name}
              {hasSubPages && (
                <ChevronDown
                  size={14}
                  className="ml-0.5 group-hover:rotate-180 transition-transform"
                />
              )}
            </Link>
            {hasSubPages && (
              <div className="absolute z-[9005] left-0 top-full hidden group-hover:block min-w-[200px] max-w-xs mt-2">
                <div className="p-1.5 bg-surface border rounded-md shadow-md max-h-80 overflow-y-auto">
                  {renderSubPages(
                    navItem.mode,
                    navItem.href,
                    navItem.subPages!,
                  )}
                </div>
              </div>
            )}

            <div className="md:hidden">
              {hasSubPages ? (
                <Popover.Root>
                  <Popover.Trigger asChild>
                    <button
                      className="flex items-center gap-2 hover:text-primary transition font-medium py-2 px-4 w-full justify-between"
                      aria-haspopup="menu"
                    >
                      {navItem.name}
                      <ChevronDown size={16} />
                    </button>
                  </Popover.Trigger>
                  <Popover.Portal>
                    <Popover.Content
                      align="start"
                      className="w-screen px-4 mt-2 z-[9999]"
                      sideOffset={4}
                    >
                      <div className="bg-white border rounded-md shadow-md p-2 max-h-64 overflow-y-auto">
                        {renderSubPages(
                          navItem.mode,
                          navItem.href,
                          navItem.subPages!,
                        )}
                      </div>
                    </Popover.Content>
                  </Popover.Portal>
                </Popover.Root>
              ) : (
                <Link
                  href={navItem.href}
                  onClick={onNavigate}
                  className=" font-medium hover:text-primary-dark transition py-2 px-4 block text-nowrap"
                >
                  {navItem.name}
                </Link>
              )}
            </div>
          </div>
        );
      })}
    </nav>
  );
};

export default NavItems;
